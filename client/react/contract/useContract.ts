import useStargazeClient from '../client/useStargazeClient'

export default function useContract() {
  const { client } = useStargazeClient()
  return {
    queryClient: client?.wagerClient,
  }
}
