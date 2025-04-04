import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { path } from "@/constants/path";
import axios from "axios";

export default function FormAddress({ handleSubmit, defaultAddress }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const addressRef = useRef("");
  const nameRef = useRef("");
  const phoneRef = useRef("");

  const selectedProvince = useMemo(() => {
    return (
      provinces.find(
        (p) => String(p.code) === String(defaultAddress?.province),
      ) || { code: "", name: "" }
    );
  }, [defaultAddress?.province, provinces]);

  const selectedDistrict = useMemo(() => {
    return (
      districts.find(
        (d) => String(d.code) === String(defaultAddress?.district),
      ) || { code: "", name: "" }
    );
  }, [defaultAddress?.district, districts]);

  const selectedWard = useMemo(() => {
    return (
      wards.find((w) => String(w.code) === String(defaultAddress?.ward)) || {
        code: "",
        name: "",
      }
    );
  }, [defaultAddress?.ward, wards]);

  useEffect(() => {
    if (!defaultAddress) {
      addressRef.current.value = "";
      nameRef.current.value = "";
      phoneRef.current.value = "";
      return;
    }

    addressRef.current.value = defaultAddress.address || "";
    nameRef.current.value = defaultAddress.name || "";
    phoneRef.current.value = defaultAddress.phone || "";
  }, [defaultAddress]);

  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/?depth=1").then((res) => {
      setProvinces(res.data);
      if (selectedProvince.code) {
        const province = res.data.find((p) => p.code === selectedProvince.code);
        if (province) {
          setSelectedProvince((prev) => ({ ...prev, name: province.name }));
        }
      }
    });
  }, []);

  useEffect(() => {
    if (selectedProvince.code) {
      axios
        .get(
          `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`,
        )
        .then((res) => {
          setDistricts(res.data.districts);
          if (selectedDistrict.code) {
            const district = res.data.districts.find(
              (d) => d.code === selectedDistrict.code,
            );
            if (district) {
              setSelectedDistrict((prev) => ({ ...prev, name: district.name }));
            }
          }
        });
    } else {
      setDistricts([]);
    }
  }, [selectedProvince.code]);

  useEffect(() => {
    if (selectedDistrict.code) {
      axios
        .get(
          `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`,
        )
        .then((res) => {
          setWards(res.data.wards);
          if (selectedWard.code) {
            const ward = res.data.wards.find(
              (w) => w.code === selectedWard.code,
            );
            if (ward) {
              setSelectedWard((prev) => ({ ...prev, name: ward.name }));
            }
          }
        });
    } else {
      setWards([]);
    }
  }, [selectedDistrict.code]);

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    const provinceName = e.target.selectedOptions[0]?.text || "";
    setSelectedProvince({ code: provinceCode, name: provinceName });
    setSelectedDistrict({ code: "", name: "" });
    setSelectedWard({ code: "", name: "" });
    setDistricts([]);
    setWards([]);
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    const districtName = e.target.selectedOptions[0]?.text || "";
    setSelectedDistrict({ code: districtCode, name: districtName });
    setSelectedWard({ code: "", name: "" });
    setWards([]);
  };

  const handleWardChange = (e) => {
    const wardCode = e.target.value;
    const wardName = e.target.selectedOptions[0]?.text || "";
    setSelectedWard({ code: wardCode, name: wardName });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      province: selectedProvince.name,
      district: selectedDistrict.name,
      ward: selectedWard.name,
      address: addressRef.current.value,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <select
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
            value={selectedProvince.code}
            onChange={handleProvinceChange}
          >
            <option value="">Tỉnh / TP</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 grid grid-cols-10 gap-4">
          <div className="col-span-5">
            <select
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
              value={selectedDistrict.code}
              onChange={handleDistrictChange}
              disabled={!selectedProvince.code}
            >
              <option value="">Quận / Huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-5">
            <select
              className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
              value={selectedWard.code}
              onChange={handleWardChange}
              disabled={!selectedDistrict.code}
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
            placeholder="Họ và tên"
            ref={nameRef}
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
            placeholder="Số nhà, tên đường"
            ref={addressRef}
          />
        </div>

        <div className="mt-4">
          <input
            type="text"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-green-500"
            placeholder="Điện thoại"
            ref={phoneRef}
          />
        </div>

        <div className="mt-8 flex items-center justify-between border-b-1 border-b-gray-300 pb-20">
          <Link to={path.cart} className="text-green-600">
            &#60; Quay lại giỏ hàng
          </Link>
          <button className="rounded-lg bg-red-600 px-10 py-4 text-white hover:cursor-pointer">
            Xác nhận thanh toán
          </button>
        </div>
      </form>
    </div>
  );
}
