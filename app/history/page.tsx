"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Trash2, Clock, FileType, ArrowRight, Lock } from "lucide-react"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { toast } from "sonner"
import { useSession } from "next-auth/react"

type HistoryItem = {
    _id: string;
    url: string;
    beforeFormat: string;
    afterFormat: string;
    name: string;
    beforeSize: number;
    afterSize: number;
    status: string;
    createdAt: string;
};

export default function HistoryPage() {
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { data: session } = useSession()

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch("/api/history")

                if (response.ok) {
                    const data = await response.json()
                    setHistory(data)
                } else {
                    toast.error("Failed to load history")
                }
            } catch (error) {
                console.error("Error loading history:", error)
                toast.error("Failed to load history")
            } finally {
                setIsLoading(false)
            }
        }

        if (session) {
            fetchHistory()
        } else {
            setIsLoading(false)
        }
    }, [session])

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/history/${id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                setHistory(history.filter(item => item._id !== id))
                toast.success("Record deleted successfully")
            } else {
                toast.error("Failed to delete record")
            }
        } catch (error) {
            console.error("Error deleting record:", error)
            toast.error("Failed to delete record")
        }
    }

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / 1048576).toFixed(1)} MB`
    }

    const calculateCompressionRate = (before: number, after: number) => {
        if (before === 0) return "0%"
        const rate = ((before - after) / before * 100).toFixed(1)
        return parseFloat(rate) > 0 ? `${rate}%` : "0%"
    }

    if (!session) {
        return (
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Conversion History</h1>
                <div className="bg-white border rounded-lg p-8 text-center">
                    <div className="bg-gray-100 mx-auto h-16 w-16 flex items-center justify-center rounded-full mb-4">
                        <Lock className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Sign in to view history</h3>
                    <p className="text-gray-500 mb-4">
                        Create an account or sign in to save and view your conversion history.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="outline">Register</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Conversion History</h1>
                <div className="h-32 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Conversion History</h1>

            {history.length === 0 ? (
                <div className="bg-white border rounded-lg p-8 text-center">
                    <div className="bg-gray-100 mx-auto h-16 w-16 flex items-center justify-center rounded-full mb-4">
                        <Clock className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No conversion history</h3>
                    <p className="text-gray-500 mb-4">
                        You haven't converted any images yet. Your conversion history will appear here.
                    </p>
                    <Link href="/convert">
                        <Button>Convert an Image</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((item) => (
                        <div key={item._id} className="bg-white border rounded-lg p-4 flex flex-col md:flex-row md:items-center">
                            <div className="md:flex-1 mb-4 md:mb-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center">
                                        <FileType className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <span className="font-medium truncate block max-w-xs">{item.name}</span>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <span className="uppercase">{item.beforeFormat}</span>
                                            <ArrowRight className="h-3 w-3 mx-1" />
                                            <span className="uppercase">{item.afterFormat}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-500 mt-2">
                                    <p>Converted {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
                                    <p className="mt-1">
                                        Size: {formatSize(item.beforeSize)} → {formatSize(item.afterSize)}
                                        <span className="text-green-600 ml-2">
                                            ({calculateCompressionRate(item.beforeSize, item.afterSize)} smaller)
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {/* <Link href={item.url} target="_blank"> */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            window.location.href = `/api/download?url=${encodeURIComponent(item.url)}&filename=${encodeURIComponent(item.name || `converted-${item.afterFormat}`)}`;
                                        }}
                                    >
                                        <Download className="h-4 w-4 mr-1" /> Download
                                    </Button>
                                {/* </Link> */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}