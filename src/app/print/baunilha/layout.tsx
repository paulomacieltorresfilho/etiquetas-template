import React from "react";
import { Comfortaa } from "next/font/google";
import './etiquetas.css';

const fontFamily = Comfortaa({subsets: ['latin']})

export default function PrintLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="pt-br">
            <body className={fontFamily.className}>{children}</body>
        </html>
    )
}