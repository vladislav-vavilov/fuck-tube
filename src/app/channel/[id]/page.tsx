import { Channel } from '@/components/Channel/Channel'
import { getChannel } from '@/services/api'

interface ChannelPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ChannelPageProps) {
  try {
    const data = await getChannel(params.id ?? '')
    return { title: `${data.name ? data.name : 'Channel'} - YouRube` }
  } catch {
    return { title: 'Channel - YouRube' }
  }
}

export default function ChannelPage() {
  return <Channel />
}
