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

        interface MediaItem {
            type: "image" | "video";
            url: string;
            start_time?: number;
            duration?: number;
        }

        const responseData = {
            response: geminiResponse.response || "",
            media: [] as MediaItem[],
        }

        interface FunctionCall {
            name: string;
            arguments: {
                source?: string;
                video_id?: string;
                start_time?: number;
                playback_duration?: number;
            };
        }

        const function_calls: FunctionCall[] = geminiResponse.function_calls || []
        for (const call of function_calls) {
            if (call.name === "display_media" && call.arguments.source) {
                const media_url = geminiHandler.getMediaUrl(call.arguments.source)
                if (media_url) {
                    responseData.media.push({
                        type: "image",
                        url: media_url // media_url is guaranteed to be string here
                    })
                }
            } else if (call.name === "play_video" && call.arguments.video_id && call.arguments.start_time) {
                const video_id = call.arguments.video_id
                const start_time = call.arguments.start_time
                const duration = call.arguments.playback_duration || 0

                const video_info = geminiHandler.getVideoInfo(video_id, start_time)
                if (video_info) {
                    const media_key = Object.keys(geminiHandler.getConfigData().available_media)
                        .find(key => geminiHandler.getConfigData().available_media[key] === video_info);
                    
                    if (media_key) {
                        const video_url = geminiHandler.getMediaUrl(media_key);
                        if (video_url) {
                            responseData.media.push({
                                type: "video",
                                url: video_url, // video_url is guaranteed to be string here
                                start_time: start_time,
                                duration: duration
                            })
                        }
                    }
                }
            } else if (call.name === "clear_media") {
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
