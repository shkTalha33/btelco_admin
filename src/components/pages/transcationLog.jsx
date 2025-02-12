import React, { useState } from 'react'
import { Container } from 'reactstrap'
import ProductTable from '../DataTable/productTable'
import { columns, data, TransactionColumns, TransactionData } from '../../utils/dummyData'


export default function TransactionLog() {

    const [loading, setLoading] = useState(false)
    const [transactionPage, setTransactionPage] = useState(0)

  return (
    <>
         <main className="min-h-screen inter_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <Container fluid className="px-2 md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full">
        <ProductTable
        heading="Transaction Logs"
        count={0}
        loading={loading}
        setCurrentPage={setTransactionPage}
        currentPage={transactionPage}
        columns={TransactionColumns}
        data={TransactionData}
        setPageNumber={setTransactionPage}
        type="search"
        pagination={true}
        itemsPerPage={10}
      />
        </Container>
      </main>
    </>
  )
}
