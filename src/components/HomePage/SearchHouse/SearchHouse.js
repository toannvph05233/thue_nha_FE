import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {getAllDistrictsByProvinceId, getAllProvinces} from "../../../service/addressService";

const SearchHouse = ({
                         setNameSearch,
                         setProvince,
                         setMinPrice,
                         setMaxPrice,
                         setCurrentPage,
                         setCategory,
                         setDistrict
                     }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);

    const handleNameSearchChange = (event) => {
        setCurrentPage(1);
        setNameSearch(event.target.value)
    };
    const handleOptionLocalChange = (event) => {
        setCurrentPage(1);
        const provinceOption = event.target.value;
        setProvince(provinceOption);
        if (provinceOption !== "Tỉnh") {
            const province = provinces.find(item => item.ProvinceName === provinceOption);
            if (province) {
                getAllDistrictsByProvinceId(province.ProvinceID).then(response => {
                    setDistricts(response.data.data);
                }).catch(error => {
                    console.log(error)
                })
            }
        } else {
            setProvince("");
            setDistrict("");
        }
    };


    const handleOptionChange = (event) => {
        setCurrentPage(1)
        const price = event.target.value;
        if (price === "1") {
            setMinPrice(0);
            setMaxPrice(1999999)
        }
        if (price === "2") {
            setMinPrice(2000000);
            setMaxPrice(2999999)
        }
        if (price === "3") {
            setMinPrice(3000000);
            setMaxPrice(0)
        }
        if (price === "Khoảng giá") {
            setMinPrice(0);
            setMaxPrice(0);
        }
    };

    const handleOptionCategoryChange = (event) => {
        setCurrentPage(1);
        setCategory(event.target.value);
    };

    const handleOptionDistrictChange = (event) => {
        setCurrentPage(1);
        if (event.target.value !== "Huyện"){
            setDistrict(event.target.value);
        }else {
            setDistrict("");
        }

    };


    useEffect(() => {
        getAllProvinces().then(response => {
            setProvinces(response.data.data);
        }).catch(error => {
            console.log(error)
        })
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    return (
        <div className="container-fluid mb-5" style={{padding: "35px", backgroundColor: "rgb(0,185,142)"}}>
            <div className="container">
                <div className="row g-2">
                    <div className="col-md-12">
                        <div className="row g-2">
                            <div className="col-md-4">
                                <input type="text" className="form-control border-0 py-3"
                                       placeholder="Nhập từ khóa tìm kiếm"
                                       onChange={handleNameSearchChange}/>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select border-0 py-3" onChange={handleOptionCategoryChange}>
                                    <option value="0">Loại Phòng</option>
                                    <option value="1">Thường</option>
                                    <option value="2">Cao cấp</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select border-0 py-3" onChange={handleOptionChange}>
                                    <option>Khoảng giá</option>
                                    <option value="1">Dưới 2.000.000 ₫</option>
                                    <option value="2">Từ 2.000.000 ₫ - 3.000.000 ₫</option>
                                    <option value="3">Trên 3.000.000 ₫</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select border-0 py-3" onChange={handleOptionLocalChange}>
                                    <option>Tỉnh</option>
                                    {!_.isEmpty(provinces) && provinces.map(province => (
                                        <option key={province.ProvinceID}
                                                value={province.ProvinceName}>
                                            {province.ProvinceName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select className="form-select border-0 py-3" onChange={handleOptionDistrictChange}>
                                    <option>Huyện</option>
                                    {!_.isEmpty(districts) && districts.map(district => (
                                        <option key={district.DistrictID}
                                                value={district.DistrictName}>
                                            {district.DistrictName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/*<div className="col-md-2">*/}
                    {/*    <button className="btn btn-dark border-0 w-100 py-3">Tìm kiếm</button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default SearchHouse;
