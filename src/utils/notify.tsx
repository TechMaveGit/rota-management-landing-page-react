import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

export default function notify(message = "", type = "success") {
    const baseStyle = {
        borderRadius: "14px",
        padding: "14px 16px",
        color: "#ffffff",
        fontSize: "14.5px",
        fontWeight: 500,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
        maxWidth: "420px",
        backdropFilter: "blur(10px)", // 🔥 glass effect
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    };

    const options = {
        duration: 2200,
    };

    const iconWrapper = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.15)", // 🔥 subtle circle bg
        flexShrink: 0,
    };

    const iconStyle = {
        fontSize: "18px",
        color: "#fff",
    };

    const renderIcon = (icon, color) => (
        <div style={iconWrapper}
        >
            <Icon icon={icon} style={{ ...iconStyle, color }} />
        </div>
    );

    switch (type.toLowerCase()) {
        case "success":
            toast.success(message, {
                ...options,
                style: {
                    ...baseStyle,
                    background: "#10b981",
                },
                icon: renderIcon("solar:check-circle-bold", "#ecfdf5"),
            });
            break;

        case "error":
        case "danger":
            toast.error(message, {
                ...options,
                style: {
                    ...baseStyle,
                    background: "#ef4444",
                },
                icon: renderIcon("solar:close-circle-bold", "#fee2e2"),
            });
            break;

        case "warning":
            toast(message, {
                ...options,
                style: {
                    ...baseStyle,
                    background: "#ebcb93ff",
                    color: "#1f2937",
                },
                icon: renderIcon("solar:danger-circle-bold", "#1f2937"),
            });
            break;

        case "info":
            toast(message, {
                ...options,
                style: {
                    ...baseStyle,
                    background: "#3b82f6",
                },
                icon: renderIcon("solar:info-circle-bold", "#eff6ff"),
            });
            break;

        case "loading":
            toast.loading(message || "Loading...", {
                ...options,
                style: {
                    ...baseStyle,
                    background: "#1f2937",
                },
                icon: renderIcon("eos-icons:loading", "#60a5fa"),
            });
            break;

        case "remove":
        case "clear":
        case "dismiss":
            toast.dismiss();
            break;

        default:
            toast(message, {
                ...options,
                style: {
                    ...baseStyle,
                    background: "#1f2937",
                    border: "1px solid #4b5563",
                },
                icon: renderIcon("solar:chat-square-code-bold", "#9ca3af"),
            });
    }
}