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
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 999999,
                backgroundColor: '#0f0f1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
            }}
        >
            {/* Simple Card */}
            <div
                style={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #4a5568',
                    borderRadius: '8px',
                    padding: '32px',
                    maxWidth: '448px',
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                {/* Icon */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                    <div style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        padding: '16px',
                        borderRadius: '50%'
                    }}>
                        <Monitor style={{ width: '48px', height: '48px', color: '#60a5fa' }} />
                    </div>
                </div>

                {/* Message */}
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '16px'
                }}>
                    Desktop Only
                </h2>
                <p style={{
                    color: '#d1d5db',
                    fontSize: '16px',
                    lineHeight: '1.6'
                }}>
                    Please open this website on a laptop or desktop computer for the best experience.
                </p>
            </div>
        </div>
    )
}
