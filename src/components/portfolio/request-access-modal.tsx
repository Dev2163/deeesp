import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectTitle: string;
  linkType: "sourceCode" | "liveDemo";
  linkUrl: string;
}

export function RequestAccessModal({ isOpen, onClose, projectId, projectTitle, linkType, linkUrl }: RequestAccessModalProps) {
  const { user, loading: authLoading, loginWithGoogle } = useAuth();
  const [requestStatus, setRequestStatus] = useState<"none" | "pending" | "approved" | "loading">("loading");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkAccessStatus();
    }
  }, [isOpen, user]);

  const checkAccessStatus = async () => {
    if (!user || !db) {
      setRequestStatus("none");
      return;
    }

    try {
      setRequestStatus("loading");
      const q = query(
        collection(db, "access_requests"),
        where("userEmail", "==", user.email),
        where("projectId", "==", projectId),
        where("type", "==", linkType)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Find if any request is approved
        const isApproved = querySnapshot.docs.some(doc => doc.data().status === "approved");
        if (isApproved) {
          setRequestStatus("approved");
          // Automatically redirect and close
          window.open(linkUrl, "_blank");
          onClose();
        } else {
          setRequestStatus("pending");
        }
      } else {
        setRequestStatus("none");
      }
    } catch (error) {
      console.error("Error checking access status:", error);
      toast.error("Failed to check access status");
      setRequestStatus("none");
    }
  };

  const handleRequestAccess = async () => {
    if (!user || !db) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "access_requests"), {
        projectId,
        projectTitle,
        userEmail: user.email,
        userName: user.displayName || "Unknown User",
        type: linkType,
        status: "pending",
        timestamp: serverTimestamp(),
      });
      setRequestStatus("pending");
      toast.success("Access request sent! You will be notified once approved.");
    } catch (error) {
      console.error("Error requesting access:", error);
      toast.error("Failed to request access. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginAndRequest = async () => {
    try {
      await loginWithGoogle();
      // After login, useEffect will trigger checkAccessStatus
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to sign in with Google. Check Firebase Console.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-zinc-950 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Request Access</DialogTitle>
          <DialogDescription className="text-slate-400">
            You need permission to access the {linkType === "sourceCode" ? "Source Code" : "Live Demo"} for <strong className="text-white">{projectTitle}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 min-h-[150px]">
          {authLoading || requestStatus === "loading" ? (
            <Loader2 className="w-8 h-8 animate-spin text-[#ffb703]" />
          ) : !user ? (
            <div className="text-center w-full space-y-4">
              <p className="text-sm text-slate-300">Please sign in with Google to request access.</p>
              <Button 
                onClick={handleLoginAndRequest} 
                className="w-full bg-white text-black hover:bg-slate-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>
          ) : requestStatus === "pending" ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Request Sent Successfully!</h3>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">
                You will be contacted via email shortly.
              </p>
              <Button 
                onClick={onClose}
                className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white"
              >
                Close
              </Button>
            </div>
          ) : requestStatus === "approved" ? (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="font-bold text-lg">Access Granted</h3>
              <p className="text-sm text-slate-400">
                Opening link...
              </p>
            </div>
          ) : (
            <div className="text-center w-full space-y-4">
              <p className="text-sm text-slate-300">
                Signed in as <span className="font-semibold text-white">{user.email}</span>
              </p>
              <Button 
                onClick={handleRequestAccess} 
                disabled={isSubmitting}
                className="w-full bg-[#ffb703] text-black hover:bg-[#ffb703]/80 font-bold"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Request Access
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
