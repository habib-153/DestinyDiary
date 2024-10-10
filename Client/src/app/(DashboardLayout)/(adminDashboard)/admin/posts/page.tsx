'use client'
import { Pagination, Spinner } from '@nextui-org/react';
import React, { useState } from 'react';

import DashboardPostCard from '@/src/components/modules/dashboard/DashbordPostCard';
import PostCardSkeleton from '@/src/components/UI/PostCardSkeleton';
import envConfig from '@/src/config/envConfig';
import { useGetAllPosts } from '@/src/hooks/post.hook';
import { IPost } from '@/src/types';

const PostManagement = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 6;
  
    const apiUrl2 = `${envConfig.baseApi}/posts?page=${currentPage}&limit=${dataPerPage}`;
    const {
      data: postData,
      isLoading: postLoading,
    } = useGetAllPosts(apiUrl2);


    const totalPagesArray = Array.from(
        { length: postData?.meta?.totalPage || 0 },
        (_, i) => i + 1
      );
    
      const totalPages = totalPagesArray.length;
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
  
    return (
      <div className="my-10 lg:my-5">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Post Management</h1>
          <p className="text-gray-500">Manage post and content</p>
        </div>
        <div className="mt-8">
          <div>
            {postData?.data?.length > 0 ? (
              postLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {postData?.data?.map((post: IPost, index: number) => (
                    <div key={index}>
                      <DashboardPostCard
                        post={post}
                      />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="flex justify-center items-center flex-col">
                <div className="pt-14 lg:pt-24">
                    <Spinner />
                </div>
              </div>
            )}
          </div>
        </div>
  
        <div>
          {postData?.data?.length > 0 && (
            <div className="flex justify-center items-center mt-6">
              <Pagination
                showControls
                initialPage={1}
                page={currentPage}
                total={totalPages}
                onChange={handlePageChange}
                
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default PostManagement;