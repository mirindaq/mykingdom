import { useState, useRef } from "react";
import { Button } from "../ui/button";
import AddressSelect from "../AddressSelect/AddressSelect";
import address from '@/database/address'

const AccountAddress = () => {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(0);
  const [addressList, setAddressList] = useState([
    {
      firstName: "Nguyễn",
      lastName: "Quốc Huy",
      phoneNumber: "0358734574",
      province: "1",
      district: "101",
      commune: "1001",
      addressDetail: "123 Đường Láng",
      isDefault: true,
    },
  ]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    province: "",
    district: "",
    commune: "",
    addressDetail: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState({});

  const inputRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    phoneNumber: useRef(null),
    addressDetail: useRef(null),
  };

  const filterDistricts = address.districts.filter((d) => d.provinceId === Number(formData.province));
  const filterCommunes = address.communes.filter((c) => c.districtId === Number(formData.district));

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
        if (!value.trim()) error = "Tên không được để trống";
        break;
      case "lastName":
        if (!value.trim()) error = "Họ không được để trống";
        break;
      case "province":
        if (!value) error = "Vui lòng chọn Tỉnh/Thành phố";
        break;
      case "district":
        if (!value) error = "Vui lòng chọn Quận/Huyện";
        break;
      case "commune":
        if (!value) error = "Vui lòng chọn Xã/Phường";
        break;
      case "addressDetail":
        if (!value.trim()) error = "Địa chỉ không được để trống";
        break;
      case "phoneNumber":
        if (!value.trim()) {
          error = "Số điện thoại không được để trống";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Số điện thoại không hợp lệ";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      firstName: validateField("firstName", formData.firstName),
      lastName: validateField("lastName", formData.lastName),
      province: validateField("province", formData.province),
      district: validateField("district", formData.district),
      commune: validateField("commune", formData.commune),
      addressDetail: validateField("addressDetail", formData.addressDetail),
      phoneNumber: validateField("phoneNumber", formData.phoneNumber),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let updatedList = [...addressList];
      if (formData.isDefault) {
        updatedList = updatedList.map((addr, idx) => ({
          ...addr,
          isDefault: idx === (editIndex !== null ? editIndex : updatedList.length),
        }));
        setDefaultAddressIndex(editIndex !== null ? editIndex : updatedList.length);
      }

      if (editIndex !== null) {
        updatedList[editIndex] = formData;
      } else {
        updatedList.push(formData);
      }

      setAddressList(updatedList);
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        province: "",
        district: "",
        commune: "",
        addressDetail: "",
        isDefault: false,
      });
      setEditIndex(null);
      setShowForm(false);
    } else {
      alert("Vui lòng kiểm tra lại thông tin nhập vào.");
    }
  };

  const handleEdit = (index) => {
    setFormData(addressList[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedList = addressList.filter((_, i) => i !== index);
    setAddressList(updatedList);
    if (index === defaultAddressIndex && updatedList.length > 0) {
      updatedList[0].isDefault = true;
      setDefaultAddressIndex(0);
    } else if (updatedList.length === 0) {
      setDefaultAddressIndex(-1);
    }
  };

  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter" && nextField) {
      inputRefs[nextField].current.focus();
    }
  };

  const getFullAddress = (addr) => {
    const province = address.provinces.find((p) => p.id === Number(addr.province))?.name || "";
    const district = address.districts.find((d) => d.id === Number(addr.district))?.name || "";
    const commune = address.communes.find((c) => c.id === Number(addr.commune))?.name || "";
    return `${addr.addressDetail}, ${commune}, ${district}, ${province}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Địa chỉ giao hàng</h2>
      {!showForm && (
        <div id="address" className="h-fit w-full border rounded-2xl flex flex-col justify-around">
          {addressList.map((addr, index) => (
            <div id="child_address" key={index} className="border-b last:border-b-0 p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-light text-gray-400">Họ và tên</p>
                  <p className="font-medium">{`${addr.firstName} ${addr.lastName}`}</p>
                </div>
                <div className="flex">
                  <Button variant="more" className="m-2" onClick={() => handleEdit(index)}>
                    Sửa
                  </Button>
                  <Button variant="more" className="m-2" onClick={() => handleDelete(index)}>
                    Xóa
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <p className="font-light text-gray-400">Điện thoại</p>
                <p className="font-medium">{addr.phoneNumber}</p>
              </div>
              <div className="mt-2">
                <p className="font-light text-gray-400">Địa chỉ</p>
                <p className="font-medium">{getFullAddress(addr)}</p>
              </div>
              {addr.isDefault && <p className="text-green-500 font-medium">Mặc định</p>}
            </div>
          ))}
        </div>
      )}
      {!showForm && (
        <Button variant="addToCart" className="mt-5" onClick={() => setShowForm(true)}>
          Thêm địa chỉ giao hàng
        </Button>
      )}

      {showForm && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">
            {editIndex !== null ? "Sửa địa chỉ" : "Thêm địa chỉ giao hàng"}
          </h3>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium">
                Tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Tên"
                className="w-full p-2 border rounded"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                onBlur={handleBlur}
                ref={inputRefs.lastName}
                onKeyDown={(e) => handleKeyDown(e, "lastName")}
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
            </div>
            <div>
              <label className="block font-medium">
                Họ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Họ"
                className="w-full p-2 border rounded"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                onBlur={handleBlur}
                ref={inputRefs.firstName}
                onKeyDown={(e) => handleKeyDown(e, "phoneNumber")}
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
            </div>
            <div>
              <label className="block font-medium">
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <AddressSelect
                options={address.provinces}
                onChange={(value) => setFormData({ ...formData, province: value })}
                label={"Tỉnh/Thành phố"}
                value={formData.province}
              />
              {errors.province && <span className="text-red-500 text-sm">{errors.province}</span>}
            </div>
            <div>
              <label className="block font-medium">
                Quận/Huyện <span className="text-red-500">*</span>
              </label>
              <AddressSelect
                options={filterDistricts}
                onChange={(value) => setFormData({ ...formData, district: value })}
                label={"Quận/Huyện"}
                value={formData.district}
              />
              {errors.district && <span className="text-red-500 text-sm">{errors.district}</span>}
            </div>
            <div>
              <label className="block font-medium">
                Phường/Xã <span className="text-red-500">*</span>
              </label>
              <AddressSelect
                options={filterCommunes}
                onChange={(value) => setFormData({ ...formData, commune: value })}
                label={"Phường/Xã"}
                value={formData.commune}
              />
              {errors.commune && <span className="text-red-500 text-sm">{errors.commune}</span>}
            </div>
            <div>
              <label className="block font-medium">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="addressDetail"
                placeholder="Địa chỉ 1"
                className="w-full p-2 border rounded"
                value={formData.addressDetail}
                onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                onBlur={handleBlur}
                ref={inputRefs.addressDetail}
                onKeyDown={(e) => handleKeyDown(e, "phoneNumber")}
              />
              {errors.addressDetail && (
                <span className="text-red-500 text-sm">{errors.addressDetail}</span>
              )}
            </div>
            <div>
              <label className="block font-medium">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Điện thoại"
                className="w-full p-2 border rounded"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                onBlur={handleBlur}
                ref={inputRefs.phoneNumber}
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="default-address"
                className="mr-2"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              />
              <label htmlFor="default-address">Đặt làm địa chỉ mặc định</label>
            </div>
            <div className="flex gap-2">
              <Button variant="addToCart" type="submit">
                {editIndex !== null ? "Cập nhật" : "Thêm địa chỉ"}
              </Button>
              <Button variant="addToCart" onClick={() => setShowForm(false)}>
                Hủy
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountAddress;