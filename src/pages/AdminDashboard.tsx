import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Loader2, ShieldAlert, CheckCircle2, XCircle, Clock, Search, LogOut, Home, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { user, loading: authLoading, loginWithGoogle, logout } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [unauthorizedLogs, setUnauthorizedLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 👇 TAMARU GMAIL ADDRESS AHIA LAKHO 👇
  const ADMIN_EMAIL = "despcr05@gmail.com";

  // Log unauthorized attempts
  useEffect(() => {
    if (user && user.email && user.email !== ADMIN_EMAIL) {
      const logAttempt = async () => {
        try {
          const loggedKey = `logged_unauth_${user.email}`;
          if (!sessionStorage.getItem(loggedKey)) {
            await addDoc(collection(db, "unauthorized_attempts"), {
              email: user.email,
              name: user.displayName || "Unknown",
              photoURL: user.photoURL || "",
              timestamp: serverTimestamp(),
              userAgent: navigator.userAgent
            });
            sessionStorage.setItem(loggedKey, "true");
          }
        } catch (error) {
          console.error("Failed to log unauthorized attempt", error);
        }
      };
      logAttempt();
    }
  }, [user]);

  // Fetch admin data
  useEffect(() => {
    if (!user || !db) {
      setLoading(false);
      return;
    }

    if (user.email !== ADMIN_EMAIL) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "access_requests"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
      setLoading(false);
    });

    const qLogs = query(collection(db, "unauthorized_attempts"), orderBy("timestamp", "desc"));
    const unsubscribeLogs = onSnapshot(qLogs, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUnauthorizedLogs(data);
    });

    return () => {
      unsubscribe();
      unsubscribeLogs();
    };
  }, [user]);

  const handleApprove = async (id: string) => {
    try {
      await updateDoc(doc(db, "access_requests", id), { status: "approved" });
      toast.success("Request approved!");
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("Failed to approve request.");
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject and delete this request?")) return;
    try {
      await deleteDoc(doc(db, "access_requests", id));
      toast.success("Request deleted.");
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to reject request.");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#fb8500] w-10 h-10" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fb8500]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 bg-white/5 border border-white/10 p-12 rounded-[2rem] backdrop-blur-xl flex flex-col items-center text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-[#fb8500]/20 rounded-2xl flex items-center justify-center mb-6">
            <ShieldAlert className="w-8 h-8 text-[#fb8500]" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-slate-400 mb-8 font-light">Sign in to manage portfolio access requests and security logs.</p>
          
          <button 
            onClick={async () => {
              try {
                await loginWithGoogle();
              } catch (error: any) {
                console.error(error);
                toast.error(error.message || "Google Login failed. Did you enable it in Firebase Console?");
              }
            }}
            className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-zinc-900/80 border border-red-500/20 p-12 rounded-[2rem] backdrop-blur-xl flex flex-col items-center text-center max-w-md w-full shadow-2xl shadow-red-500/5"
        >
          <div className="text-red-500 mb-6 bg-red-500/10 p-4 rounded-full">
            <XCircle className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-white">Access Denied</h1>
          <p className="text-slate-400 mb-8 font-light leading-relaxed">
            The email <strong className="text-white bg-white/10 px-2 py-1 rounded">{user.email}</strong> is not authorized to view the admin dashboard. This attempt has been logged.
          </p>
          <button 
            onClick={logout}
            className="w-full py-3.5 border border-white/20 rounded-xl hover:bg-white hover:text-black hover:border-white font-bold transition-all"
          >
            Logout & Try Another Account
          </button>
        </motion.div>
      </div>
    );
  }

  const pendingRequests = requests.filter(r => r.status === "pending").length;
  const approvedRequests = requests.filter(r => r.status === "approved").length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#fb8500]/30 selection:text-white pb-20">
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#fb8500] to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-[#fb8500]/20">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Admin Portal</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Security & Access</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate("/")} 
              className="hidden md:flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" /> View Site
            </button>
            <div className="w-px h-6 bg-white/10 hidden md:block" />
            <div className="flex items-center gap-3 bg-white/5 pl-2 pr-4 py-1.5 rounded-full border border-white/10">
              <img src={user.photoURL || ""} alt="admin" className="w-7 h-7 rounded-full border border-white/20" />
              <span className="text-sm font-medium text-slate-300 hidden sm:block">{user.email}</span>
            </div>
            <button 
              onClick={logout} 
              className="p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
              <Clock className="w-16 h-16 text-[#fb8500]" />
            </div>
            <p className="text-slate-400 text-sm font-medium mb-2 relative z-10">Pending Requests</p>
            <h3 className="text-4xl font-bold text-white relative z-10">{pendingRequests}</h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <p className="text-slate-400 text-sm font-medium mb-2 relative z-10">Approved Access</p>
            <h3 className="text-4xl font-bold text-white relative z-10">{approvedRequests}</h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
              <ShieldAlert className="w-16 h-16 text-red-500" />
            </div>
            <p className="text-red-400 text-sm font-medium mb-2 relative z-10">Security Alerts</p>
            <h3 className="text-4xl font-bold text-red-500 relative z-10">{unauthorizedLogs.length}</h3>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Access Requests Table (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#fb8500]" />
                Access Requests
              </h2>
            </div>
            
            <div className="bg-zinc-900/80 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              {loading ? (
                <div className="p-20 flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-[#fb8500]" /></div>
              ) : requests.length === 0 ? (
                <div className="p-20 flex flex-col items-center justify-center text-slate-500">
                  <Search className="w-12 h-12 mb-4 opacity-20" />
                  <p>No access requests found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-black/40 border-b border-white/5 text-xs uppercase tracking-wider text-slate-500 font-bold">
                      <tr>
                        <th className="p-5">User</th>
                        <th className="p-5">Requested Asset</th>
                        <th className="p-5">Status</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="p-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#fb8500] to-orange-600 flex items-center justify-center text-white font-bold shadow-md">
                                {req.userName ? req.userName.charAt(0).toUpperCase() : '?'}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-200">{req.userName}</div>
                                <div className="text-xs text-slate-500">{req.userEmail}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-white">{req.projectTitle}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-slate-500 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                                {req.type === "sourceCode" ? "Source Code" : "Live Demo"}
                              </span>
                              <span className="text-[10px] text-slate-600 uppercase tracking-wider">{new Date(req.timestamp?.toDate()).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="p-5">
                            {req.status === "approved" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                Approved
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="p-5 text-right">
                            <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                              {req.status === "pending" && (
                                <button 
                                  onClick={() => handleApprove(req.id)}
                                  className="px-3 py-1.5 bg-white text-black text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors shadow-lg"
                                >
                                  Approve
                                </button>
                              )}
                              <button 
                                onClick={() => handleReject(req.id)}
                                className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-lg hover:bg-red-500/20 transition-colors"
                              >
                                {req.status === "pending" ? "Reject" : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Unauthorized Access Logs Sidebar */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-red-400">
                <ShieldAlert className="w-5 h-5" />
                Security Logs
              </h2>
            </div>

            <div className="bg-zinc-900/80 border border-red-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-red-500/5 h-[600px] flex flex-col">
              {unauthorizedLogs.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
                  <ShieldAlert className="w-12 h-12 mb-4 opacity-20 text-green-500" />
                  <p className="text-sm">System is secure. No unauthorized attempts recorded.</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {unauthorizedLogs.map((log) => (
                    <div key={log.id} className="p-4 rounded-xl bg-black/50 border border-red-500/10 hover:border-red-500/30 transition-colors group">
                      <div className="flex items-center gap-3 mb-3">
                        {log.photoURL ? (
                          <img src={log.photoURL} alt="avatar" className="w-10 h-10 rounded-full border border-red-500/20" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-bold">
                            {log.name ? log.name.charAt(0).toUpperCase() : '?'}
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <h4 className="font-semibold text-slate-200 truncate">{log.name}</h4>
                          <p className="text-xs text-slate-500 truncate">{log.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-red-500/10">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">Blocked</span>
                        <span className="text-xs text-slate-500">
                          {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleString([], {month: 'short', day: '2-digit', hour: '2-digit', minute:'2-digit'}) : "Just now"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      
      {/* Custom Scrollbar Styles for the security logs */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.4);
        }
      `}} />
    </div>
  );
}
