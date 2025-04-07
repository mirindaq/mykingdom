import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { path } from "@/constants/path";
import axios from "axios";

export default function FormAddress({ handleSubmit, defaultAddress }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({ code: "", name: "" });
  const [selectedDistrict, setSelectedDistrict] = useState({ code: "", name: "" });
  const [selectedWard, setSelectedWard] = useState({ code: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addressRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    if (!defaultAddress) {
      resetForm();
      return;
    }

    setSelectedProvince({
      code: defaultAddress.province || "",
      name: "",
    });
    setSelectedDistrict({
      code: defaultAddress.district || "",
      name: "",
    });
    setSelectedWard({
      code: defaultAddress.ward || "",
      name: "",
    });

    if (addressRef.current) addressRef.current.value = defaultAddress.address || "";
    if (nameRef.current) nameRef.current.value = defaultAddress.name || "";
    if (phoneRef.current) phoneRef.current.value = defaultAddress.phone || "";
  }, [defaultAddress]);

  // Fetch provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://provinces.open-api.vn/api/?depth=1");
        setProvinces(res.data);
      } catch (err) {
        setError("Failed to load provinces");
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (!selectedProvince.code) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`
        );
        setDistricts(res.data.districts);
      } catch (err) {
        setError("Failed to load districts");
      } finally {
        setLoading(false);
      }
    };
    fetchDistricts();
  }, [selectedProvince.code]);

  useEffect(() => {
    if (!selectedDistrict.code) {
      setWards([]);
      return;
    }

    const fetchWards = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
        );
        setWards(res.data.wards);
      } catch (err) {
        setError("Failed to load wards");
      } finally {
        setLoading(false);
      }
    };
    fetchWards();
  }, [selectedDistrict.code]);

  const resetForm = () => {
    setSelectedProvince({ code: "", name: "" });
    setSelectedDistrict({ code: "", name: "" });
    setSelectedWard({ code: "", name: "" });
    if (addressRef.current) addressRef.current.value = "";
    if (nameRef.current) nameRef.current.value = "";
    if (phoneRef.current) phoneRef.current.value = "";
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit({
      province: selectedProvince.name,
      district: selectedDistrict.name,
      ward: selectedWard.name,
      address: addressRef.current?.value || "",
      name: nameRef.current?.value || "",
      phone: phoneRef.current?.value || "",
    });
  };

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="gap-2">
      <form onSubmit={handleSubmitForm}>
        <div>
          <select
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            value={selectedProvince.code}
            onChange={(e) => setSelectedProvince({ 
              code: e.target.value, 
              name: e.target.selectedOptions[0]?.text || "" 
            })}
            disabled={loading}
          >
            <option value="">Tỉnh/Thành phố</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <select
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            value={selectedDistrict.code}
            onChange={(e) => setSelectedDistrict({ 
              code: e.target.value, 
              name: e.target.selectedOptions[0]?.text || "" 
            })}
            disabled={!selectedProvince.code || loading}
          >
            <option value="">Quận/Huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>

          <select
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            value={selectedWard.code}
            onChange={(e) => setSelectedWard({ 
              code: e.target.value, 
              name: e.target.selectedOptions[0]?.text || "" 
            })}
            disabled={!selectedDistrict.code || loading}
          >
            <option value="">Xã/Phường</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 space-y-4">
          <input
            type="text"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
            placeholder="Tên người nhận"
            ref={nameRef}
          />
          <input
            type="text"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
            placeholder="Địa chỉ"
            ref={addressRef}
          />
          <input
            type="tel"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
            placeholder="Số điện thoại"
            ref={phoneRef}
          />
        </div>

        <div className="mt-8 flex items-center justify-between border-b border-gray-300 pb-6">
          <Link to={path.cart} className="text-green-600 hover:underline">
            ← Quay lại giỏ hàng
          </Link>
          <button
            type="submit"
            className="rounded-lg bg-red-600 px-10 py-4 text-white hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            Xác nhận thanh toán
          </button>
        </div>
      </form>
    </div>
  );
}

