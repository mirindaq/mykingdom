import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';

export default function BirthRegister() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    birthday: '',
    gender: '',
    relation: ''
  });

  const [errors, setErrors] = useState({});

  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDate = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date) && date <= new Date();
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'email':
        if (!value) error = 'Email không được để trống';
        else if (!validateEmail(value)) error = 'Email không đúng định dạng';
        break;
      case 'name':
        if (!value) error = 'Tên không được để trống';
        break;
      case 'birthday':
        if (!value) error = 'Vui lòng chọn ngày sinh';
        else if (!validateDate(value)) error = 'Ngày sinh không hợp lệ';
        break;
      case 'gender':
        if (!value) error = 'Vui lòng chọn giới tính';
        break;
      case 'relation':
        if (!value) error = 'Vui lòng chọn quan hệ';
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nameRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email không được để trống';
    else if (!validateEmail(formData.email)) newErrors.email = 'Email không đúng định dạng';

    if (!formData.name) newErrors.name = 'Tên không được để trống';

    if (!formData.birthday) newErrors.birthday = 'Vui lòng chọn ngày sinh';
    else if (!validateDate(formData.birthday)) newErrors.birthday = 'Ngày sinh không hợp lệ';

    if (!formData.gender) newErrors.gender = 'Vui lòng chọn giới tính';
    if (!formData.relation) newErrors.relation = 'Vui lòng chọn quan hệ';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const submitData = {
        email: formData.email,
        name: formData.name,
        birthday: formData.birthday,
        gender: formData.gender,
        relation: formData.relation,
      };
      console.log(submitData);
      alert('Đăng kí thành công!');
      setFormData({
        email: '',
        name: '',
        birthday: '',
        gender: '',
        relation: '',
      });
      setErrors({});
    } else {
      alert('Thông tin chưa phù hợp.');
    }
  };

  return (
    <form className="w-full mx-auto" onSubmit={handleSubmit}>
      <div className="mt-20 mb-5 text-center">
        <p className="font-bold text-3xl">Đăng kí nhận code sinh nhật</p>
        <p>Áp dụng cho thành viên và bé</p>
        <p>Vui lòng nhập lại chính xác địa chỉ email của bạn</p>
      </div>

      <div className="space-y-4">
        <div>
          <input
            ref={emailRef}
            className="border rounded-sm text-lg h-12 block w-full ps-2"
            type="text"
            name="email"
            placeholder="Nhập lại email đăng kí tài khoản"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleEmailKeyPress}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div>
          <input
            ref={nameRef}
            className="border rounded-sm text-lg h-12 block w-full ps-2"
            type="text"
            name="name"
            placeholder="Tên người nhận code sinh nhật"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div>
          <label className="block mb-2">Ngày sinh</label>
          <input
            className="border rounded-sm text-lg h-12 block w-full ps-2"
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            min="1900-01-01"
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.birthday && <span className="text-red-500 text-sm">{errors.birthday}</span>}
        </div>

        <div>
          <label className="block mb-2">Giới tính</label>
          <select
            className="border rounded-sm text-lg h-12 block w-full ps-2"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Chọn giới tính</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
            <option value="khac">Khác</option>
          </select>
          {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
        </div>

        <div>
          <label className="block mb-2">Quan hệ với chủ thẻ</label>
          <select
            className="border rounded-sm text-lg h-12 block w-full ps-2"
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Chọn quan hệ</option>
            <option value="chinhchu">Chính chủ</option>
            <option value="con">Con</option>
          </select>
          {errors.relation && <span className="text-red-500 text-sm">{errors.relation}</span>}
        </div>

        <Button
          className="w-full h-12 mt-2 text-lg"
          variant="addToCart"
          type="submit"
          onClick={handleSubmit}
        >
          Đăng kí thông tin
        </Button>
      </div>
    </form>
  );
}