import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import useSWR from "swr";
import {ProgressSpinner} from "primereact/progressspinner";
import {Avatar} from "primereact/avatar";
import {useState} from "react";
import {SortOrder} from "primereact/api";
import {Button} from "primereact/button";
import React from "react";
import {Ripple} from "primereact/ripple";

const UserTable = () => {
    const fetcher = async (url: string) => {
        const response = await fetch(url);
        //await new Promise(resolve => setTimeout(resolve, 100)); // for testing
        return response.json();
    };

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(15);
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState(SortOrder.ASC);
    const {
        data,
        error
    } = useSWR(
        `https://dummyjson.com/users/?skip=${first}&limit=${rows}&sortBy=${sortField}` +
        `&order=${sortOrder === SortOrder.UNSORTED ? "" : sortOrder === SortOrder.ASC ? "asc" : "desc"}`, fetcher);


    const onPageChange = (e) => {
        setFirst(e.first);
        setRows(e.rows);
    };

    if (error) return <div>Error loading data</div>;
    if (!data) return <ProgressSpinner animationDuration=".1s"/>

    const avatarBodyTemplate = (rowData) => {
        return <>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <Avatar label={rowData.firstName.charAt(0).toUpperCase()}
                        image={rowData.image}/><span>{rowData.firstName}</span>
            </div>
        </>;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button text icon="pi pi-pencil" outlined className="" onClick={() => {}} />
                <Button icon="pi pi-trash" className="mr-10 p-ripple" outlined severity="danger" onClick={() => {}} />
                <Button icon="pi pi-eye" className="mr-10 p-ripple" outlined severity="success" onClick={() => {}} />
            </React.Fragment>
        );
    };

    const onSortChange = (e) => {
        setSortField(e.sortField);
        if (e.sortField !== sortField) {
            setSortOrder(SortOrder.ASC);
            return;
        }
        switch (sortOrder) {

            case SortOrder.UNSORTED:
                setSortOrder(SortOrder.ASC);
                break;
            case SortOrder.DESC:
                setSortOrder(SortOrder.ASC);
                break;
            case SortOrder.ASC:
                setSortOrder(SortOrder.DESC);
                break;
        }

    };

    const header = <p>Users</p>;
    const footer = <p>Total users : {data.users ? data.total : 0}</p>;

    return (
        <div className="table-wrapper">
            <DataTable value={data.users} size="small" showGridlines stripedRows header={header} footer={footer}
                       paginator onPage={onPageChange} lazy
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                       first={first} rows={rows} totalRecords={data.total} rowsPerPageOptions={[15, 20, 25, 30]}
                       currentPageReportTemplate="{first} to {last} of {totalRecords}"
                       onSort={onSortChange} sortField={sortField} sortOrder={sortOrder}
            >
                <Column field="id" header="Id" sortable/>
                <Column body={avatarBodyTemplate} header={"Name"} field="firstName" sortable/>
                <Column field="lastName" header="User name" sortable filter filterPlaceholder="Search by name"/>
                <Column field="email" header="Email" sortable/>
                <Column field="phone" header="Phone" sortable/>
                <Column field="image" header="Image" sortable/>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '11rem' }} header="Actions"></Column>
            </DataTable>
        </div>
    );
};

export default UserTable;