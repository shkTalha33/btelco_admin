/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CircularProgress } from '@mui/material';
import { message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiFunction from '../api/apiFuntions';
import { attendSupport, getSupports } from '../api/ApiRoutesFile';
import ProductTable from '../dataTable2/productTable';

const CustomerSupport = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [lastId, setLastId] = useState(1);
    const [title, setTitle] = useState('')
    const [attended, setattended] = useState(false)
    const [description, setDescription] = useState('')
    const [lastId2, setLastId2] = useState(0);
    const [selectItem, setselectItem] = useState(null)
    const [openModal, setopenModal] = useState(false)
    const [count, setCount] = useState(0);
    const { get, post, put } = ApiFunction()
    const [categories, setCategories] = useState([])

    const handleClick = (row) => {
        setselectItem(row)
        setopenModal(true)
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const data = {
            title: title,
            description: description,
        }
        const endpoint = `${attendSupport}/${selectItem?._id}`
        try {
            const res = await put(endpoint, data)
            if (res.service) {
                message.success('Message Attend Successfully')
                fetchData()
                setopenModal(false)
            } else {
                message.error('Failed to Attend Message')
                setopenModal(false)
            }
        } catch (error) {
            setIsProcessing(false);
        } finally {
            setIsProcessing(false);
        }
    }

    const columns = [
        {
            name: "#",
            sortable: true,
            maxWidth:"70px",
            cell: (row, index) => (
                <span className="poppins_medium">{index + 1}</span>
            )
        },
        {
            name: "Name",
            sortable: true,
            minWidth:"200px",
            cell: (row) => (
                <span className="poppins_medium">{!row?.name ? 'Not found' : row?.name}</span>
            )
        },
        {
            name: "Email",
            sortable: true,
            minWidth:"250px",
            cell: (row) => (
                <span className="poppins_medium">{!row?.email ? 'Not found' : row?.email}</span>
            )
        },
        {
            name: "Message",
            sortable: true,
            minWidth:"300px",
            cell: (row) => (
                <span className="poppins_medium">{!row?.msg ? 'Not found' : row?.msg}</span>
            )
        },
        {
            name: 'Status',
            sortable: true,
            minWidth:"100px",
            cell: (row) => {
                return (
                    row?.attended === true ?
                        <button disabled style={{ backgroundColor: '#ecf8f0', color: '#1C8C6E', padding: '6px 12px' }} className="poppins_medium rounded text-center h-auto whitespace-nowrap">
                            {row?.attended === true ? 'Attended' : 'Not attended'}
                        </button> :
                        <button disabled={isProcessing} onClick={() => handleClick(row)} style={{ backgroundColor: '#2B7F75', padding: '6px 20px' }} className="text_white flex justify-center rounded-3 items-center">Attend</button>
                )
            }
        },
        // {
        //     name: 'Action',
        //     allowoverflow: true,
        //     cell: () => {
        //         return (
        //             <div className='flex gap-1'>
        //                 <button className="bg-[#2B7F75] flex justify-center rounded-3 w-[24px] h-[24px] items-center"><Edit size={14} className='text_white' /></button>
        //             </div>
        //         )
        //     }
        // }
    ]

    const fetchData = async () => {
        setLoading(true);
        const endpoint = `${getSupports}/${lastId}`
        try {
            const res = await get(endpoint);
            if (res?.success) {
                setCategories(res?.Messages);
                setCount(res?.count?.totalPage);
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [lastId]);

    return (
        <>
            <main className="container-fluid p-3 p-lg-5 mx-auto" style={{ minHeight: '90vh' }}>
                <div className="d-flex mb-4 align-items-center justify-content-between">
                    <h4 className="poppins_medium  w-full text_black">Customer Support</h4>
                </div>
                <ProductTable
                    loading={loading}
                    count={count}
                    setCurrentPage={setLastId2}
                    currentPage={lastId2}
                    columns={columns}
                    data={categories}
                    setLastId={setLastId}
                />
            </main>
            <Modal
                open={openModal}
                onCancel={() => setopenModal(false)}
                footer={null}
                closeIcon
                centered
            >
                <Form onSubmit={handleUpdate}>
                    <div className="flex flex-col gap-2 w-100">
                        <Form.Group className="w-full">
                            <Form.Label className="poppins_semibold  text_dark">
                                Title
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                // value={question}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ padding: "10px 20px" }}
                                className="form-control rounded-3 poppins_regular text_secondary2 bg_white border"
                                placeholder="Enter Title..."
                            />
                        </Form.Group>
                        <Form.Group className="shadow_def w-full">
                            <Form.Label className="poppins_semibold text_dark">
                                Description
                            </Form.Label>
                            <Form.Control
                                type="text"
                                required
                                as='textarea'
                                // value={question}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ padding: "10px 20px" }}
                                className="form-control rounded-3 poppins_regular text_secondary2 bg_white border"
                                placeholder="Enter Description..."
                            />
                        </Form.Group>
                    </div>
                    <div className="flex justify-end my-3 w-full">
                        <button
                            type="submit"
                            disabled={isProcessing}
                            style={{ padding: '12px 24px' }}
                            className={`bg_primary text_white w-100 rounded-3 poppins_medium flex justify-center items-center`}
                        >
                            {isProcessing ? (
                                <CircularProgress color="inherit" size={20} />
                            ) : (
                                "Attend"
                            )}
                        </button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default CustomerSupport;