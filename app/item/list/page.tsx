"use client";
import React, { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 5; // 페이지당 출력할 항목 수
const PAGES_PER_GROUP = 5; // 그룹당 페이지 수

const deleteOrder = async (order_no: any) => {
  const res = await fetch(
    `http://localhost:4000/api/products/delete?order_no=${order_no}`
  );
};

const Home = () => {
  const [levelType, setLevelType] = useState("");
  const [mailType, setMailType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 여기부터 작성, 여기부터 return 전까지의 기존 코드 모두 제거 후 작성
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (page_no) => {
    const res = await fetch("http://localhost:4000/api/products/read");
    const retVal = await res.text();
    const data = JSON.parse(retVal).slice((page_no - 1) * 5, page_no * 5);

    setOrders(data);
  };

  useEffect(() => {
    fetchOrders(1);

    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/api/products/read");
      const data = await res.text();
      setTotalPages(Math.ceil(JSON.parse(data).length / ITEMS_PER_PAGE));
    };

    fetchData();
  }, []);

  const currentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
  const startPage = (currentGroup - 1) * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

  const handlePageClick = (pageNo: number) => {
    setCurrentPage(pageNo);
    fetchOrders(pageNo);
  };

  const handleGroupNavigation = (direction: "prev" | "next") => {
    let newGroupStartPage =
      direction === "prev"
        ? startPage - PAGES_PER_GROUP
        : startPage + PAGES_PER_GROUP;
    newGroupStartPage = Math.max(newGroupStartPage, 1);
    const newPage = newGroupStartPage;

    setCurrentPage(newPage);
    fetchOrders(newPage);
  };

  return (
    <main className="container  flex mx-auto ">
      <div className="w-full max-w-4xl ">
        <div className="mt-6 text-right pb-7">
          <a
            href="/item/regist"
            className="bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            등록
          </a>
        </div>
        {/* 주문목록리스트출력 */}
        <table className="w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NO.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이미지
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider style={{ maxWidth: '200px' }}">
                상품명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                가격
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                색상
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                재고
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                카테고리
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                등록일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                수정일
              </th>
              <th
                colSpan={2}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
              >
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* !! 여기부터 구조체와 안맞는 멤버 변수들 수정 */}
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href="/item/detail"
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {order.id}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={order.image_link} style={{ width: "50px" }}></img>
                </td>
                <td
                  className="px-6 py-4 overflow-hidden text-ellipsis whitespace-nowrap"
                  style={{ maxWidth: "200px" }}
                >
                  {order.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.product_colors}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.category}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {order.created_at.slice(0, 10)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.updated_at.slice(0, 10)}
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <a
                    href="/item/regist"
                    className="bg-gray-700 text-white py-2 px-4 mx-2 rounded-lg hover:bg-gray-600 font-light"
                    style={{
                      minWidth: "60px",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    수정
                  </a>
                  <button
                    className="bg-gray-700 text-white py-2 px-4 mx-2 rounded-lg hover:bg-gray-600 font-light"
                    style={{
                      minWidth: "60px",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => deleteOrder(order.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* 페이지네이션 */}
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 mx-1 bg-gray-200 rounded"
            onClick={() => handleGroupNavigation("prev")}
            disabled={startPage === 1}
          >
            이전
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              key={startPage + index}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === startPage + index
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageClick(startPage + index)}
            >
              {startPage + index}
            </button>
          ))}
          <button
            className="px-4 py-2 mx-1 bg-gray-200 rounded"
            onClick={() => handleGroupNavigation("next")}
            disabled={endPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
