import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET() {
  if (!YOUTUBE_API_KEY) {
    return NextResponse.json(
      { error: 'YouTube API key is not configured' },
      { status: 500 }
    );
  }

  try {
    // First, get live streams from YouTube Gaming
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&videoCategoryId=20&maxResults=12&key=${YOUTUBE_API_KEY}`
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to fetch live streams');
    }

    const searchData = await searchResponse.json();

    // Get video IDs from search results
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    // Get detailed video information including viewer count
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,liveStreamingDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );

    if (!videoResponse.ok) {
      throw new Error('Failed to fetch video details');
    }

    const videoData = await videoResponse.json();

    // Format the response
    const streams = videoData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      viewerCount: formatViewerCount(item.statistics.viewCount),
      startTime: formatStartTime(item.liveStreamingDetails.actualStartTime),
      channelThumbnail: item.snippet.channelThumbnail?.url
    }));

    return NextResponse.json({ streams });
  } catch (error) {
    console.error('Error fetching YouTube streams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live streams' },
      { status: 500 }
    );
  }
}

function formatViewerCount(count: string): string {
  const num = parseInt(count);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return count;
}

function formatStartTime(startTime: string): string {
  const start = new Date(startTime);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
} 