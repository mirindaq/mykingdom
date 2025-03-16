const address = {
  provinces: [
  { id: 1, name: 'Hà Nội' },
  { id: 2, name: 'Hồ Chí Minh' },
  { id: 3, name: 'Đà Nẵng' },
  { id: 4, name: 'Hải Phòng' },
  { id: 5, name: 'Cần Thơ' }
],

districts : [
  // Hà Nội
  { id: 101, name: 'Ba Đình', provinceId: 1 },
  { id: 102, name: 'Hoàn Kiếm', provinceId: 1 },
  { id: 103, name: 'Tây Hồ', provinceId: 1 },
  { id: 104, name: 'Cầu Giấy', provinceId: 1 },
  { id: 105, name: 'Đống Đa', provinceId: 1 },
  { id: 106, name: 'Thanh Xuân', provinceId: 1 },
  { id: 107, name: 'Hai Bà Trưng', provinceId: 1 },
  { id: 108, name: 'Hoàng Mai', provinceId: 1 },

  // Hồ Chí Minh
  { id: 201, name: 'Quận 1', provinceId: 2 },
  { id: 202, name: 'Quận 3', provinceId: 2 },
  { id: 203, name: 'Quận 4', provinceId: 2 },
  { id: 204, name: 'Quận 5', provinceId: 2 },
  { id: 205, name: 'Quận 7', provinceId: 2 },
  { id: 206, name: 'Quận 10', provinceId: 2 },
  { id: 207, name: 'Thủ Đức', provinceId: 2 },
  { id: 208, name: 'Bình Thạnh', provinceId: 2 },

  // Đà Nẵng
  { id: 301, name: 'Hải Châu', provinceId: 3 },
  { id: 302, name: 'Thanh Khê', provinceId: 3 },
  { id: 303, name: 'Sơn Trà', provinceId: 3 },
  { id: 304, name: 'Ngũ Hành Sơn', provinceId: 3 },
  { id: 305, name: 'Liên Chiểu', provinceId: 3 },
  { id: 306, name: 'Cẩm Lệ', provinceId: 3 },

  // Hải Phòng
  { id: 401, name: 'Hồng Bàng', provinceId: 4 },
  { id: 402, name: 'Lê Chân', provinceId: 4 },
  { id: 403, name: 'Ngô Quyền', provinceId: 4 },
  { id: 404, name: 'Hải An', provinceId: 4 },
  { id: 405, name: 'Kiến An', provinceId: 4 },

  // Cần Thơ
  { id: 501, name: 'Ninh Kiều', provinceId: 5 },
  { id: 502, name: 'Bình Thủy', provinceId: 5 },
  { id: 503, name: 'Cái Răng', provinceId: 5 },
  { id: 504, name: 'Ô Môn', provinceId: 5 },
  { id: 505, name: 'Thốt Nốt', provinceId: 5 },
],

communes : [
  // Hà Nội - Ba Đình (id: 101)
  { id: 1001, name: 'Phúc Xá', districtId: 101 },
  { id: 1002, name: 'Trúc Bạch', districtId: 101 },
  { id: 1003, name: 'Cống Vị', districtId: 101 },
  { id: 1004, name: 'Đội Cấn', districtId: 101 },
  { id: 1005, name: 'Ngọc Hà', districtId: 101 },

  // Hà Nội - Hoàn Kiếm (id: 102)
  { id: 1006, name: 'Hàng Bông', districtId: 102 },
  { id: 1007, name: 'Hàng Trống', districtId: 102 },
  { id: 1008, name: 'Lý Thái Tổ', districtId: 102 },
  { id: 1009, name: 'Phan Chu Trinh', districtId: 102 },
  { id: 1010, name: 'Tràng Tiền', districtId: 102 },

  // Hà Nội - Tây Hồ (id: 103)
  { id: 1011, name: 'Quảng An', districtId: 103 },
  { id: 1012, name: 'Tứ Liên', districtId: 103 },
  { id: 1013, name: 'Yên Phụ', districtId: 103 },
  { id: 1014, name: 'Nhật Chiêu', districtId: 103 },
  { id: 1015, name: 'Bưởi', districtId: 103 },

  // Hà Nội - Cầu Giấy (id: 104)
  { id: 1016, name: 'Nghĩa Đô', districtId: 104 },
  { id: 1017, name: 'Dịch Vọng', districtId: 104 },
  { id: 1018, name: 'Mai Dịch', districtId: 104 },
  { id: 1019, name: 'Trung Hòa', districtId: 104 },
  { id: 1020, name: 'Yên Hòa', districtId: 104 },

  // Hà Nội - Đống Đa (id: 105)
  { id: 1021, name: 'Láng Thượng', districtId: 105 },
  { id: 1022, name: 'Ô Chợ Dừa', districtId: 105 },
  { id: 1023, name: 'Nam Đồng', districtId: 105 },
  { id: 1024, name: 'Khâm Thiên', districtId: 105 },
  { id: 1025, name: 'Thổ Quan', districtId: 105 },

  // Hà Nội - Thanh Xuân (id: 106)
  { id: 1026, name: 'Nhân Chính', districtId: 106 },
  { id: 1027, name: 'Thanh Xuân Bắc', districtId: 106 },
  { id: 1028, name: 'Thanh Xuân Nam', districtId: 106 },
  { id: 1029, name: 'Khương Đình', districtId: 106 },
  { id: 1030, name: 'Hạ Đình', districtId: 106 },

  // Hà Nội - Hai Bà Trưng (id: 107)
  { id: 1031, name: 'Bạch Đằng', districtId: 107 },
  { id: 1032, name: 'Minh Khai', districtId: 107 },
  { id: 1033, name: 'Trương Định', districtId: 107 },
  { id: 1034, name: 'Lê Đại Hành', districtId: 107 },
  { id: 1035, name: 'Đồng Tâm', districtId: 107 },

  // Hà Nội - Hoàng Mai (id: 108)
  { id: 1036, name: 'Định Công', districtId: 108 },
  { id: 1037, name: 'Giáp Bát', districtId: 108 },
  { id: 1038, name: 'Hoàng Liệt', districtId: 108 },
  { id: 1039, name: 'Thịnh Liệt', districtId: 108 },
  { id: 1040, name: 'Yên Sở', districtId: 108 },

  // Hồ Chí Minh - Quận 1 (id: 201)
  { id: 2001, name: 'Bến Nghé', districtId: 201 },
  { id: 2002, name: 'Bến Thành', districtId: 201 },
  { id: 2003, name: 'Cầu Ông Lãnh', districtId: 201 },
  { id: 2004, name: 'Nguyễn Thái Bình', districtId: 201 },
  { id: 2005, name: 'Tân Định', districtId: 201 },

  // Hồ Chí Minh - Quận 3 (id: 202)
  { id: 2006, name: 'Phường 1', districtId: 202 },
  { id: 2007, name: 'Phường 2', districtId: 202 },
  { id: 2008, name: 'Phường 3', districtId: 202 },
  { id: 2009, name: 'Phường 4', districtId: 202 },
  { id: 2010, name: 'Phường 5', districtId: 202 },

  // Hồ Chí Minh - Quận 4 (id: 203)
  { id: 2011, name: 'Phường 1', districtId: 203 },
  { id: 2012, name: 'Phường 2', districtId: 203 },
  { id: 2013, name: 'Phường 3', districtId: 203 },
  { id: 2014, name: 'Phường 4', districtId: 203 },
  { id: 2015, name: 'Phường 5', districtId: 203 },

  // Hồ Chí Minh - Quận 5 (id: 204)
  { id: 2016, name: 'Phường 1', districtId: 204 },
  { id: 2017, name: 'Phường 2', districtId: 204 },
  { id: 2018, name: 'Phường 3', districtId: 204 },
  { id: 2019, name: 'Phường 4', districtId: 204 },
  { id: 2020, name: 'Phường 5', districtId: 204 },

  // Hồ Chí Minh - Quận 7 (id: 205)
  { id: 2021, name: 'Tân Kiểng', districtId: 205 },
  { id: 2022, name: 'Tân Hưng', districtId: 205 },
  { id: 2023, name: 'Tân Phong', districtId: 205 },
  { id: 2024, name: 'Phú Mỹ', districtId: 205 },
  { id: 2025, name: 'Bình Thuận', districtId: 205 },

  // Hồ Chí Minh - Quận 10 (id: 206)
  { id: 2026, name: 'Phường 1', districtId: 206 },
  { id: 2027, name: 'Phường 2', districtId: 206 },
  { id: 2028, name: 'Phường 3', districtId: 206 },
  { id: 2029, name: 'Phường 4', districtId: 206 },
  { id: 2030, name: 'Phường 5', districtId: 206 },

  // Hồ Chí Minh - Thủ Đức (id: 207)
  { id: 2031, name: 'Linh Trung', districtId: 207 },
  { id: 2032, name: 'Linh Chiểu', districtId: 207 },
  { id: 2033, name: 'Hiệp Bình Chánh', districtId: 207 },
  { id: 2034, name: 'Tam Phú', districtId: 207 },
  { id: 2035, name: 'Bình Chiểu', districtId: 207 },

  // Hồ Chí Minh - Bình Thạnh (id: 208)
  { id: 2036, name: 'Phường 1', districtId: 208 },
  { id: 2037, name: 'Phường 2', districtId: 208 },
  { id: 2038, name: 'Phường 3', districtId: 208 },
  { id: 2039, name: 'Phường 5', districtId: 208 },
  { id: 2040, name: 'Phường 7', districtId: 208 },

  // Đà Nẵng - Hải Châu (id: 301)
  { id: 3001, name: 'Hải Châu I', districtId: 301 },
  { id: 3002, name: 'Hải Châu II', districtId: 301 },
  { id: 3003, name: 'Thạch Thang', districtId: 301 },
  { id: 3004, name: 'Bình Hiên', districtId: 301 },
  { id: 3005, name: 'Nam Dương', districtId: 301 },

  // Đà Nẵng - Thanh Khê (id: 302)
  { id: 3006, name: 'Thanh Khê Đông', districtId: 302 },
  { id: 3007, name: 'Thanh Khê Tây', districtId: 302 },
  { id: 3008, name: 'Xuân Hà', districtId: 302 },
  { id: 3009, name: 'An Khê', districtId: 302 },
  { id: 3010, name: 'Thạc Gián', districtId: 302 },

  // Đà Nẵng - Sơn Trà (id: 303)
  { id: 3011, name: 'An Hải Bắc', districtId: 303 },
  { id: 3012, name: 'An Hải Đông', districtId: 303 },
  { id: 3013, name: 'An Hải Tây', districtId: 303 },
  { id: 3014, name: 'Mân Thái', districtId: 303 },
  { id: 3015, name: 'Phước Mỹ', districtId: 303 },

  // Đà Nẵng - Ngũ Hành Sơn (id: 304)
  { id: 3016, name: 'Mỹ An', districtId: 304 },
  { id: 3017, name: 'Khuê Mỹ', districtId: 304 },
  { id: 3018, name: 'Hòa Quý', districtId: 304 },
  { id: 3019, name: 'Hòa Hải', districtId: 304 },
  { id: 3020, name: 'Mỹ Đa', districtId: 304 },

  // Đà Nẵng - Liên Chiểu (id: 305)
  { id: 3021, name: 'Hòa Khánh Bắc', districtId: 305 },
  { id: 3022, name: 'Hòa Khánh Nam', districtId: 305 },
  { id: 3023, name: 'Hòa Hiệp Bắc', districtId: 305 },
  { id: 3024, name: 'Hòa Hiệp Nam', districtId: 305 },
  { id: 3025, name: 'Hòa Minh', districtId: 305 },

  // Đà Nẵng - Cẩm Lệ (id: 306)
  { id: 3026, name: 'Hòa Thọ Đông', districtId: 306 },
  { id: 3027, name: 'Hòa Thọ Tây', districtId: 306 },
  { id: 3028, name: 'Hòa Xuân', districtId: 306 },
  { id: 3029, name: 'Khuê Trung', districtId: 306 },
  { id: 3030, name: 'Hòa An', districtId: 306 },

  // Hải Phòng - Hồng Bàng (id: 401)
  { id: 4001, name: 'Hạ Lý', districtId: 401 },
  { id: 4002, name: 'Hùng Vương', districtId: 401 },
  { id: 4003, name: 'Quán Toan', districtId: 401 },
  { id: 4004, name: 'Sở Dầu', districtId: 401 },
  { id: 4005, name: 'Thượng Lý', districtId: 401 },

  // Hải Phòng - Lê Chân (id: 402)
  { id: 4006, name: 'Cát Dài', districtId: 402 },
  { id: 4007, name: 'Đông Hải', districtId: 402 },
  { id: 4008, name: 'Lam Sơn', districtId: 402 },
  { id: 4009, name: 'Nghĩa Xá', districtId: 402 },
  { id: 4010, name: 'Trại Cau', districtId: 402 },

  // Hải Phòng - Ngô Quyền (id: 403)
  { id: 4011, name: 'Cầu Đất', districtId: 403 },
  { id: 4012, name: 'Đông Khê', districtId: 403 },
  { id: 4013, name: 'Gia Viên', districtId: 403 },
  { id: 4014, name: 'Lạch Tray', districtId: 403 },
  { id: 4015, name: 'Máy Tơ', districtId: 403 },

  // Hải Phòng - Hải An (id: 404)
  { id: 4016, name: 'Đằng Hải', districtId: 404 },
  { id: 4017, name: 'Đằng Lâm', districtId: 404 },
  { id: 4018, name: 'Nam Hải', districtId: 404 },
  { id: 4019, name: 'Tràng Cát', districtId: 404 },
  { id: 4020, name: 'Thành Tô', districtId: 404 },

  // Hải Phòng - Kiến An (id: 405)
  { id: 4021, name: 'Đồng Hòa', districtId: 405 },
  { id: 4022, name: 'Nam Sơn', districtId: 405 },
  { id: 4023, name: 'Ngọc Sơn', districtId: 405 },
  { id: 4024, name: 'Quán Trữ', districtId: 405 },
  { id: 4025, name: 'Trần Thành Ngọ', districtId: 405 },

  // Cần Thơ - Ninh Kiều (id: 501)
  { id: 5001, name: 'Cái Khế', districtId: 501 },
  { id: 5002, name: 'An Hội', districtId: 501 },
  { id: 5003, name: 'Tân An', districtId: 501 },
  { id: 5004, name: 'Xuân Khánh', districtId: 501 },
  { id: 5005, name: 'Hưng Lợi', districtId: 501 },

  // Cần Thơ - Bình Thủy (id: 502)
  { id: 5006, name: 'Bình Thủy', districtId: 502 },
  { id: 5007, name: 'Trà An', districtId: 502 },
  { id: 5008, name: 'Long Hòa', districtId: 502 },
  { id: 5009, name: 'Long Tuyền', districtId: 502 },
  { id: 5010, name: 'Thới An Đông', districtId: 502 },

  // Cần Thơ - Cái Răng (id: 503)
  { id: 5011, name: 'Ba Láng', districtId: 503 },
  { id: 5012, name: 'Hưng Phú', districtId: 503 },
  { id: 5013, name: 'Hưng Thạnh', districtId: 503 },
  { id: 5014, name: 'Lê Bình', districtId: 503 },
  { id: 5015, name: 'Phú Thứ', districtId: 503 },

  // Cần Thơ - Ô Môn (id: 504)
  { id: 5016, name: 'Châu Văn Liêm', districtId: 504 },
  { id: 5017, name: 'Long Hưng', districtId: 504 },
  { id: 5018, name: 'Phước Thới', districtId: 504 },
  { id: 5019, name: 'Thới Hòa', districtId: 504 },
  { id: 5020, name: 'Thới Long', districtId: 504 },

  // Cần Thơ - Thốt Nốt (id: 505)
  { id: 5021, name: 'Tân Hưng', districtId: 505 },
  { id: 5022, name: 'Tân Lộc', districtId: 505 },
  { id: 5023, name: 'Thới Thuận', districtId: 505 },
  { id: 5024, name: 'Thuận An', districtId: 505 },
  { id: 5025, name: 'Trung Nhứt', districtId: 505 },
]}

export default address;