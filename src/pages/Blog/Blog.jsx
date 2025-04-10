import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Grid, List, Search } from "lucide-react";
import NewsBox, { NewsBoxSkeleton } from "@/components/NewsBox/NewsBox";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { path } from "@/constants/path";
import { articleApi } from "@/services/article.api";
import { useSearchParams } from "react-router-dom";
import { tagApi } from "@/services/tag.api";

export default function Blog() {
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [viewType, setViewType] = useState("grid");
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTagSlug, setSelectedTagSlug] = useState(null);
  const inputRef = useRef(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const tag = searchParams.get("tag") || "";
      const query = searchParams.get("search") || "";
      const articles = await articleApi.searchArticles(tag, query);
      setData(articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    setLoading(false);
  };

  const fetchTags = async () => {
    try {
      const tagsData = await tagApi.getAllTag();
      setTags(tagsData || []);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchTags();
    setSelectedTagSlug(searchParams.get("tag"));
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;

    const params = {
      search: value,
    };
    if (selectedTagSlug) {
      params.tag = selectedTagSlug;
    }

    setSearchParams(params);
  };

  const handleTagClick = (tag) => {
    if (tag) {
      setSearchParams({ tag: tag.slug });
      setSelectedTagSlug(tag.slug);
    } else {
      setSearchParams({});
      setSelectedTagSlug(tag);
    }
  };

  const breadcrumbsData = [
    { path: path.homepage, label: "Trang chủ" },
    { path: path.blogs, label: "Cẩm nang" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbsData} />
      <div className="container mx-auto rounded-lg pb-14">
        <div className="mb-6">
          <img
            src="/images/camnang.png"
            alt="Cẩm nang Mykingdom"
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <form onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full rounded-lg border p-3 pl-10"
                />
              </form>
              <Search
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
            </div>
            {/* Danh mục bài viết */}
            <div className="mt-4 rounded-lg bg-white p-4 shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-gray-700">
                DANH MỤC BÀI VIẾT
              </h3>
              {tags.length > 0 && (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue={
                    selectedTagSlug ? `${selectedTagSlug}` : undefined
                  }
                >
                  <AccordionItem key="all" value="all" className="py-2">
                    <AccordionTrigger
                      className={`rounded-lg px-4 py-3 text-base font-medium transition ${
                        selectedTagSlug == null
                          ? "bg-red-100 font-semibold text-red-500"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleTagClick(null)}
                      chevronDown={false}
                    >
                      Tất cả
                    </AccordionTrigger>
                  </AccordionItem>
                  {tags?.map((tag) => (
                    <AccordionItem
                      key={tag.slug}
                      value={`${tag.slug}`}
                      className="py-2"
                    >
                      <AccordionTrigger
                        className={`rounded-lg px-4 py-3 text-base font-medium transition ${
                          selectedTagSlug === tag.slug
                            ? "bg-red-100 font-semibold text-red-500"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleTagClick(tag)}
                        chevronDown={true}
                      >
                        {tag.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="px-2 py-2 text-justify text-base text-gray-500">
                          {tag.contentTag}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                Tất cả bài viết
              </h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => setViewType("grid")}
                  className="border p-2 hover:bg-gray-100"
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className="border p-2 hover:bg-gray-100"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
            <div
              className={`grid gap-6 ${viewType === "grid" ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {loading ? (
                Array(6)
                  .fill(0)
                  .map((_, index) => <NewsBoxSkeleton key={index} />)
              ) : data.length > 0 ? (
                data
                  .slice(0, visibleCount)
                  .map((post) => (
                    <NewsBox
                      key={post._id}
                      image={post.image}
                      title={post.title}
                      description={post.content}
                      link={`/articles/${post.slug}`}
                    />
                  ))
              ) : (
                <span className="col-span-2 text-center text-lg font-semibold text-gray-500">
                  Không có bài viết nào
                </span>
              )}
            </div>
            {!loading && visibleCount < data.length && (
              <div className="mt-6 flex justify-center">
                <button
                  className="bg-red-500 px-4 py-2 text-white shadow-md hover:bg-red-600"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                >
                  Xem thêm bài viết
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
