import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({pageParam = 0}) => {
      const data = await api.get('/api/images?after=' + pageParam)

      return data;
    },
    {
      getNextPageParam: lastPage => lastPage.data.after ?? null,
    }
  );
    
  const formattedData = useMemo(() => {
    return data?.pages.flatMap(image => image.data.data)
  }, [data]);

  if (isLoading) return <Loading />

  if (isError) return <Error />

  return (
    <>
      <Header />

      <Box maxW={1120} px={{base:"10", md:"20"}} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Carregando...'
              : 'Carregar Mais'
            }
          </Button>
        )}
      </Box>
    </>
  );
}
