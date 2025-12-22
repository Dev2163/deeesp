import { useEffect, useState } from "react"
import { Monitor, Smartphone } from "lucide-react"

export function MobileRedirect() {
    const [isMobile, setIsMobile] = useState(false)
    const [showSplash, setShowSplash] = useState(true)

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

        // Hide splash after 3 seconds
        const timer = setTimeout(() => {
            setShowSplash(false)
        }, 3000)

        return () => {
            window.removeEventListener('resize', checkMobile)
            clearTimeout(timer)
        }
    }, [])

    if (!isMobile) {
        return null
    }

    if (showSplash) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] overflow-hidden">
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"
                            style={{
                                width: `${Math.random() * 100 + 50}px`,
                                height: `${Math.random() * 100 + 50}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${Math.random() * 3 + 2}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6">
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <Smartphone className="w-20 h-20 text-blue-400 animate-bounce" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gradient-cosmic mb-4 animate-pulse">
                        Welcome
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(71,133,255,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
            </div>

            {/* Content Card */}
            <div className="relative z-10 max-w-md mx-6 p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse" />
                        <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-full border border-white/10">
                            <Monitor className="w-12 h-12 text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Desktop Experience Required
                </h2>

                {/* Message */}
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                    This portfolio is optimized for desktop viewing to provide the best interactive experience with animations and effects.
                </p>

                {/* Device comparison */}
                <div className="flex items-center justify-center gap-8 mb-6">
                    <div className="text-center">
                        <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 mb-2">
                            <Smartphone className="w-8 h-8 text-red-400 mx-auto" />
                        </div>
                        <p className="text-xs text-gray-400">Mobile</p>
                    </div>
                    <div className="text-2xl text-gray-600">→</div>
                    <div className="text-center">
                        <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20 mb-2">
                            <Monitor className="w-8 h-8 text-green-400 mx-auto" />
                        </div>
                        <p className="text-xs text-gray-400">Desktop</p>
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-4">
                    <p className="text-sm text-blue-300 text-center font-medium">
                        Please open this portfolio on a laptop or desktop computer
                    </p>
                </div>

                {/* Features list */}
                <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span>Interactive 3D animations</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <span>Custom cursor effects</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                        <span>Cosmic background visuals</span>
                    </div>
                </div>

                {/* Footer note */}
                <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-xs text-gray-500 text-center">
                        Mobile version coming soon ✨
                    </p>
                </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
    )
}
