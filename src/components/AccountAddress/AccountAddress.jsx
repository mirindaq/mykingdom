import { useState, useRef , useEffect} from "react";
import { Button } from "../ui/button";
import AddressSelect from "../AddressSelect/AddressSelect";
import { useAuth } from "@/hooks/AuthContext";
import { addressApi } from "@/api/address.api";
import { toast } from "react-toastify";

const AccountAddress = () => {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const {user} = useAuth();
  // const [addressList, setAddressList] = useState(user.address);
  const [addressList, setAddressList] = useState(user?.address || []);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    province: "",
    district: "",
    commune: "",
    addressDetail: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState({});

  const inputRefs = {
    name: useRef(null),
    phoneNumber: useRef(null),
    addressDetail: useRef(null),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [provincesData, districtsData, wardsData] = await Promise.all([
          addressApi.getAllProvinces(),
          addressApi.getAllDistricts(),
          addressApi.getAllWards()
        ]);
  
        setProvinces(provincesData);
        setDistricts(districtsData);
        setWards(wardsData);
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
  
    fetchData();
  }, []);
    

  const filterDistricts = districts.filter((d) => d.province_code === Number(formData.province));
  const filterCommunes = wards.filter((c) => c.district_code === Number(formData.district));

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Họ và tên không được để trống";
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
      name: validateField("name", formData.name),
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
        name: "",
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
    const province = provinces.find((p) => p.code=== Number(addr.province))?.name || "";
    const district = districts.find((d) => d.code === Number(addr.district))?.name || "";
    const ward = wards.find((c) => c.code === Number(addr.commune))?.name || "";
    return `${addr.addressDetail}, ${ward}, ${district}, ${province}`;
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
                  <p className="font-medium">{`${addr.name}`}</p>
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
                Họ và Tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Tên"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onBlur={handleBlur}
                ref={inputRefs.name}
                onKeyDown={(e) => handleKeyDown(e, "name")}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>
            <div>
              <label className="block font-medium">
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <AddressSelect
                options={provinces}
                onChange={(value) => setFormData({ ...formData, province: value})}
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