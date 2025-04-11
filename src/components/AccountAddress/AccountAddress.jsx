import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import AddressSelect from "../AddressSelect/AddressSelect";
import { useAuth } from "@/hooks/AuthContext";
import { addressApi } from "@/services/address.api";
import { toast } from "react-toastify";
import { userApi } from "@/services/user.api";

const AccountAddress = () => {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const { user, updateUserAddress } = useAuth();
  const [addressList, setAddressList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState({});

  const inputRefs = {
    name: useRef(null),
    phone: useRef(null),
    address: useRef(null),
  };

  useEffect(() => {
    if (user) {
      setAddressList(user.user.address);
    }
  }, [user]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const provincesData = await addressApi.getAllProvinces();
      setProvinces(provincesData);
  
      if (addressList.length > 0) {
        const uniqueProvinces = [...new Set(addressList.map(addr => addr.province))];
        const districtPromises = uniqueProvinces.map(provinceId =>
          addressApi.getDistrictsByProvince(provinceId)
        );
        const districtsData = await Promise.all(districtPromises);
        setDistricts(districtsData.flat());
  
        const uniqueDistricts = [...new Set(addressList.map(addr => addr.district))];
        const wardPromises = uniqueDistricts.map(districtId =>
          addressApi.getWardsByDistrict(districtId)
        );
        const wardsData = await Promise.all(wardPromises);
        setWards(wardsData.flat());
      }
    };
  
    fetchInitialData();
  }, [addressList]); 

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provincesData = await addressApi.getAllProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (formData.province) {
        try {
          const districtsData = await addressApi.getDistrictsByProvince(formData.province);
          setDistricts(districtsData);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      }
    };
    fetchDistricts();
  }, [formData.province]);

  useEffect(() => {
    const fetchWards = async () => {
      if (formData.district) {
        try {
          const wardsData = await addressApi.getWardsByDistrict(formData.district);
          setWards(wardsData);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      }
    };
    fetchWards();
  }, [formData.district]);

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
      case "ward":
        if (!value) error = "Vui lòng chọn Xã/Phường";
        break;
      case "address":
        if (!value.trim()) error = "Địa chỉ không được để trống";
        break;
      case "phone":
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
      ward: validateField("ward", formData.ward),
      address: validateField("address", formData.address),
      phone: validateField("phone", formData.phone),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleUpdateUserAddress = async (userId, updatedAddressList) => {
    try {
      const response = await updateUserAddress(userId, updatedAddressList);
      if (response) {
        toast.success("Cập nhật địa chỉ thành công");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      console.error("Error updating user address:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin nhập vào.");
      return;
    }

    try {
      const newAddress = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        isDefault: formData.isDefault,
      };
      const updatedAddressList =
        editIndex !== null
          ? [...addressList].map((addr, idx) =>
              idx === editIndex ? newAddress : addr
            )
          : [...addressList, newAddress];

      if (formData.isDefault) {
        updatedAddressList.forEach((addr, idx) => {
          addr.isDefault =
            idx ===
            (editIndex !== null ? editIndex : updatedAddressList.length - 1);
        });
        setDefaultAddressIndex(
          editIndex !== null ? editIndex : updatedAddressList.length - 1
        );
      }

      setAddressList(updatedAddressList);
      setFormData({
        name: "",
        phone: "",
        province: "",
        district: "",
        ward: "",
        address: "",
        isDefault: false,
      });
      setEditIndex(null);
      setShowForm(false);

      await handleUpdateUserAddress(user.user._id, updatedAddressList);
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      console.error("Error saving address:", error);
    }
  };

  const handleEdit = async (index) => {
    const addressToEdit = addressList[index];
    setFormData(addressToEdit); // Set dữ liệu địa chỉ cần sửa vào formData
    setEditIndex(index);
    setShowForm(true);

    // Fetch districts và wards dựa trên province và district hiện tại
    try {
      if (addressToEdit.province) {
        const districtsData = await addressApi.getDistrictsByProvince(addressToEdit.province);
        setDistricts(districtsData);
      }
      if (addressToEdit.district) {
        const wardsData = await addressApi.getWardsByDistrict(addressToEdit.district);
        setWards(wardsData);
      }
    } catch (error) {
      console.error("Error fetching data for edit:", error);
    }
  };

  const handleDelete = async (index) => {
    const updatedList = addressList.filter((_, i) => i !== index);
    setAddressList(updatedList);

    if (index === defaultAddressIndex && updatedList.length > 0) {
      updatedList[0].isDefault = true;
      setDefaultAddressIndex(0);
    } else if (updatedList.length === 0) {
      setDefaultAddressIndex(-1);
    }

    await handleUpdateUserAddress(user.user._id, updatedList);
  };

  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter" && nextField) {
      inputRefs[nextField].current.focus();
    }
  };

  const getFullAddress = (addr) => {
    const province = provinces.find((p) => String(p.id) === String(addr.province))?.full_name || "";
    const district = districts.find((d) => String(d.id) === String(addr.district))?.full_name || "";
    const ward = wards.find((w) => String(w.id) === String(addr.ward))?.full_name || "";
    return `${addr.address}, ${ward}, ${district}, ${province}`;
  };

  return (
    <div className="mx-auto rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Địa chỉ giao hàng</h2>
      {!showForm && (
        <div
          id="address"
          className="flex h-fit w-full flex-col justify-around rounded-2xl border"
        >
          {addressList.map((addr, index) => (
            <div
              id="child_address"
              key={index}
              className="border-b p-4 last:border-b-0"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-light text-gray-400">Họ và tên</p>
                  <p className="text-lg font-medium">{`${addr.name}`}</p>
                </div>
                <div className="flex">
                  <Button
                    variant="more"
                    className="m-2"
                    onClick={() => handleEdit(index)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="more"
                    className="m-2"
                    onClick={() => handleDelete(index)}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-lg font-light text-gray-400">Điện thoại</p>
                <p className="text-lg font-medium">{addr.phone}</p>
              </div>
              <div className="mt-2">
                <p className="text-lg font-light text-gray-400">Địa chỉ</p>
                <p className="text-lg font-medium">{getFullAddress(addr)}</p>
              </div>
              {addr.isDefault && (
                <p className="text-lg font-medium text-green-500">Mặc định</p>
              )}
            </div>
          ))}
        </div>
      )}
      {!showForm && (
        <Button
          variant="addToCart"
          className="mt-5"
          onClick={() => setShowForm(true)}
        >
          Thêm địa chỉ giao hàng
        </Button>
      )}

      {showForm && (
        <div className="mt-4 border-t pt-4">
          <h3 className="mb-2 text-lg font-semibold">
            {editIndex !== null ? "Sửa địa chỉ" : "Thêm địa chỉ giao hàng"}
          </h3>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium">
                Họ và Tên <span className="text-red-500 ">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Tên"
                className="w-full rounded border p-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onBlur={handleBlur}
                ref={inputRefs.name}
                onKeyDown={(e) => handleKeyDown(e, "name")}
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name}</span>
              )}
            </div>
            <div>
              <label className="block font-medium">
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <AddressSelect
                options={provinces.map(p => ({ value: p.id, label: p.full_name }))}
                onChange={(value) =>
                  setFormData({ ...formData, province: value, district: "", ward: "" })
                }
                label={"Tỉnh/Thành phố"}
                value={formData.province}
              />
              {errors.province && (
                <span className="text-sm text-red-500">{errors.province}</span>
              )}
            </div>
            <div>
              <label className="block font-medium">
                Quận/Huyện <span className="text-red-500">*</span>
              </label>
              <AddressSelect
                options={districts.map(d => ({ value: d.id, label: d.full_name }))}
                onChange={(value) =>
                  setFormData({ ...formData, district: value, ward: "" })
                }
                label={"Quận/Huyện"}
                value={formData.district}
              />
              {errors.district && (
                <span className="text-sm text-red-500">{errors.district}</span>
              )}
            </div>
            <div>
              <label className="block font-medium">
                Phường/Xã <span className="text-red-500">*</span>
              </label>
              <AddressSelect
                options={wards.map(w => ({ value: w.id, label: w.full_name }))}
                onChange={(value) => setFormData({ ...formData, ward: value })}
                label={"Phường/Xã"}
                value={formData.ward}
              />
              {errors.ward && (
                <span className="text-sm text-red-500">{errors.ward}</span>
              )}
            </div>
            <div>
              <label className="block font-medium">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ 1"
                className="w-full rounded border p-2"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                onBlur={handleBlur}
                ref={inputRefs.address}
                onKeyDown={(e) => handleKeyDown(e, "phone")}
              />
              {errors.address && (
                <span className="text-sm text-red-500">{errors.address}</span>
              )}
            </div>
            <div>
              <label className="block font-medium">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Điện thoại"
                className="w-full rounded border p-2"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                onBlur={handleBlur}
                ref={inputRefs.phone}
              />
              {errors.phone && (
                <span className="text-sm text-red-500">{errors.phone}</span>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="default-address"
                className="mr-2"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
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