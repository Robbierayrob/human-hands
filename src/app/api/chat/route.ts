import { NextResponse } from 'next/server'
import { GeminiHandler } from '@/lib/gemini-handler'

// Initialize Gemini handler
const geminiHandler = new GeminiHandler()

export async function POST(request: Request) {
    try {
        const data = await request.json()
        
        if (!data || !data.message) {
            return NextResponse.json(
                { error: "Missing 'message' in request body." },
                { status: 400 }
            )
        }

        const userMessage = data.message
        const geminiResponse = await geminiHandler.processMessage(userMessage)

        if ("error" in geminiResponse) {
            return NextResponse.json(geminiResponse, { status: 500 })
        }

        const responseData = {
            response: geminiResponse.get("response", ""),
            media: [],
        }

        const function_calls = geminiResponse.get("function_calls", [])
        for (const call of function_calls) {
            if (call["name"] === "display_media") {
                const media_url = geminiHandler.get_media_url(call["arguments"]["source"])
                if (media_url) {
                    responseData.media.push({
                        type: "image",
                        url: media_url
                    })
                }
            } else if (call["name"] === "play_video") {
                const video_id = call["arguments"]["video_id"]
                const start_time = call["arguments"]["start_time"]
                const duration = call["arguments"]["playback_duration"]

                const video_info = geminiHandler.get_video_info(video_id, start_time)
                if (video_info) {
                    const video_url = geminiHandler.get_media_url(
                        Object.keys(geminiHandler.config_data['available_media'])
                            .find(key => geminiHandler.config_data['available_media'][key] === video_info) || ''
                    )
                    responseData.media.push({
                        type: "video",
                        url: video_url,
                        start_time: start_time,
                        duration: duration
                    })
                }
            } else if (call["name"] === "clear_media") {
                responseData.media = []
            }
        }

        return NextResponse.json(responseData)
        
    } catch (error) {
        console.error("Error in chat API:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
