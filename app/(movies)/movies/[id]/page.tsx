import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  return { title: movie.title };
}

// [id] 를 통해서 dynamic route 를 사용할 수 있습니다.
export default async function MovieDetail({ params: { id } }: IParams) {
  // Promise.all을 사용하면 두개의 Promise를 동시에 실행할 수 있음.

  return (
    <div>
      {/* Suspense를 사용하면 fallback을 통해서 loading을 보여줄 수 있음 */}
      {/* suspense를 쓰면 Promise.all()과 달리 병렬로 실행되지 않고 순차적으로 실행 */}
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie Videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

// { params: { id: '12322' }, searchParams: {} }
// params는 dynamic route의 parameter를 가져옵니다.
// searchParams는 query string을 가져옵니다.
