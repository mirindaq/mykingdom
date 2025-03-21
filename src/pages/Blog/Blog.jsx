import React, { useEffect, useState } from "react";
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
import { articleApi } from "@/api/article.api";
import { tagApi } from "@/api/tag.api";

export default function Blog() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedTag, setSelectedTag] = useState(null);
  const [viewType, setViewType] = useState("grid");
  const [tags, setTags] = useState([]);
  const [allArticles, setAllArticles] = useState([]);

  // Lấy tag bài viết từ API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagList = await tagApi.getAllTag();
        setTags(tagList);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  //  Lấy tất cả bài viết khi mới tải trang
  useEffect(() => {
    const fetchAllArticles = async () => {
      setLoading(true);
      try {
        const articles = await articleApi.getAllArticles();
        console.log("All articles fetched:", articles);
        setAllArticles(articles); // Lưu tất cả bài viết
        setData(articles); // Hiển thị tất cả bài viết khi mới tải trang
      } catch (error) {
        console.error("Error fetching all articles:", error);
      }
      setLoading(false);
    };
    fetchAllArticles();
  }, []);

  // lay dlieu theo tag
  const fetchArticlesBySlugTag = async (slug) => {
    setLoading(true);
    try {
      const articles = await articleApi.getArticlesBySlugTag(slug);

      setData(articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
    setLoading(false);
  };
  //chon vao danh muc
  const handleTagClick = (tag) => {
    if (selectedTag !== tag._id) {
      setSelectedTag(tag._id);
      setVisibleCount(6);
      fetchArticlesBySlugTag(tag.slug);
    } else {
      setSelectedTag(null);
      setData(allArticles); // Quay lại danh sách tất cả bài viết nếu nhấn lại cùng một danh mục
    }
  };

  const fetchData = (url, setDataResponse) => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDataResponse(data);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   articleApi.getArticlesByTag().then((data) => {
  //     setData(data);
  //     console.log(data);
  //   });
  // }, []);

  useEffect(() => {
    fetchData("https://67d54d82d2c7857431eff604.mockapi.io/newsbox2", setData2);
  }, []);

  const handleViewChange = (type) => {
    setViewType(type);
  };

  const breadcrumbsData = [
    { path: path.homepage, label: "Trang chủ" },
    { path: path.blog, label: "Cẩm nang" },
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbsData} />
      <div className="container mx-auto rounded-lg pb-14">
        {/* Banner */}
        <div className="mb-6">
          <img
            src="/images/camnang.png"
            alt="Cẩm nang Mykingdom"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Phần tìm kiếm & danh mục bài viết */}
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Sidebar */}
          <div className="w-full space-y-4 md:w-1/3">
            {/* Ô tìm kiếm */}
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm (VD: lắp ráp, mô hình, ba lô...)"
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <Search
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
            </div>

            {/* Danh mục bài viết */}
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h3 className="mb-3 text-lg font-semibold text-gray-700">
                DANH MỤC BÀI VIẾT
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {tags.length > 0 ? (
                  tags.map((tag) => (
                    <AccordionItem
                      key={tag._id}
                      value={`category-${tag._id}`}
                      className="py-2"
                    >
                      <AccordionTrigger
                        className={`rounded-lg px-4 py-3 text-base font-medium transition ${
                          selectedTag === tag._id
                            ? "bg-red-100 font-semibold text-red-500"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="px-2 py-2 text-justify text-base text-gray-500">
                          {tag.contentTag}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <p className="text-gray-500">Không có danh mục nào.</p>
                )}
              </Accordion>
            </div>
          </div>

          {/* Phần hiển thị bài viết */}
          <div className="w-full md:w-2/3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedTag ? `Bài viết liên quan` : "Tất cả bài viết"}
              </h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => setViewType("grid")}
                  className="rounded-lg border p-2 hover:bg-gray-100"
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className="rounded-lg border p-2 hover:bg-gray-100"
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Danh sách bài viết */}
            <div
              className={`grid gap-6 ${viewType === "grid" ? "grid-cols-2" : "grid-cols-1"}`}
            >
              {loading ? (
                Array(6)
                  .fill(0)
                  .map((_, index) => <NewsBoxSkeleton key={index} />)
              ) : data.length > 0 ? (
                data.slice(0, visibleCount).map((post) => (
                  <NewsBox
                    key={post._id}
                    image={post.image} // Không có ảnh trong API, hiển thị ảnh mặc định
                    title={post.title}
                    description={post.content}
                    link={`/articles/${post.slug}`}
                  />
                ))
              ) : (
                <span className="col-span-2">
                  <img
                    src="/images/noArticle.webp"
                    alt="No news available"
                    className="mx-auto w-1/2 mt-5"
                  />
                  <div className="text-center text-lg font-semibold text-gray-500">
                    Không có bài viết nào
                  </div>
                </span>
              )}
            </div>

            {/* Nút "Xem thêm bài viết" */}
            {!loading && visibleCount < data.length && (
              <div className="animate-fade-in mt-6 flex justify-center">
                <button
                  className="rounded-lg bg-red-500 px-4 py-2 text-white shadow-md transition hover:bg-red-600"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                >
                  Xem thêm bài viết
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Phần "Có thể bạn sẽ thích" */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800">
            Có thể bạn sẽ thích
          </h3>
          <div className="mt-4 grid grid-cols-4 gap-6">
            {data2.map((post2) => (
              <NewsBox
                key={post2.id}
                image={post2.image}
                title={post2.title}
                description={post2.description}
                link={post2.link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
