import React from "react";
import './style.css'

export default function PrintLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="pt-br">
            <body>{children}</body>
        </html>
    )
}