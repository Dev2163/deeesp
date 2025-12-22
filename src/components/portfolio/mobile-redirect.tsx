import { useEffect, useState } from "react"
import { Monitor } from "lucide-react"

export function MobileRedirect() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase()
            const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone']
            const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) || window.innerWidth < 768
            setIsMobile(isMobileDevice)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    if (!isMobile) {
        return null
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f0f1a] p-6">
            {/* Simple Card */}
            <div className="bg-[#1a1a2e] border border-gray-700 rounded-lg p-8 max-w-md w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-500/10 p-4 rounded-full">
                        <Monitor className="w-12 h-12 text-blue-400" />
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-2xl font-bold text-white mb-4">
                    Desktop Only
                </h2>
                <p className="text-gray-300 text-base leading-relaxed">
                    Please open this website on a laptop or desktop computer for the best experience.
                </p>
            </div>
        </div>
    )
}
