import Image from "next/image";
import Link from 'next/link';
import Heading from '@/components/Heading';
import { getReviews, getSearchableReviews } from '@/lib/reviews';
import PaginationBar from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }) {
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex justify-between pb-3">
        <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
      </div>
      <ul className='flex flex-row flex-wrap gap-3'>
      {reviews.map((review, index) =>(
        <li key={review.slug}
        className='bg-white border rounded shadow w-80 hover:shadow-xl'>
          <Link href={`/reviews/${review.slug}`}>
            <Image src={review.image} alt="" priority={index === 0}
            width="320" height="180" className=" rounded-t"/>
            <h2 className='font-semibold font-orbitron py-1 text-center'>
              {review.title}
            </h2>
          </Link>
        </li>
        ))}
      </ul>
    </>
  );
}


function parsePageParam(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}