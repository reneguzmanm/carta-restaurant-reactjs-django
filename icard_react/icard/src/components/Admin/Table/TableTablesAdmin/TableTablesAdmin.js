import React, { useState } from 'react';
import "./TableTablesAdmin.scss";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from 'lodash';
import { ModalBasic } from '../../../Common';
import QRCode from "qrcode.react";

export function TableTablesAdmin(props) {
    const { tables, updateTable, deleteTable } = props;
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);

    const openCloseModal = () => setShowModal((prev) => !prev);

    const showQr = (table) =>{
        setContentModal(
            <div style={{textAlign: "center"}}>
                <QRCode value={`${window.location.origin}/client/${table.number}`}/>
            </div>
        );

        openCloseModal();
    }
  return (
    <>
        <Table className='table-tables-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.Cell>N° de mesa</Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {map(tables, (table, index) =>(
                <Table.Row key={index}>
                    <Table.Cell>Mesa N° {table.number}</Table.Cell>
                    <Actions table={table} updateTable={updateTable} deleteTable={deleteTable} showQr={showQr} />
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
        <ModalBasic
            show={showModal}
            onClose={openCloseModal}
            title="Código QR"
            size='mini'
            children={contentModal}
        />
    </>
    
  );
}

function Actions(props){
    const { table, updateTable, deleteTable, showQr } = props;
    return(
        <Table.Cell textAlign='right'>
            <Button color='white' icon onClick={()=>showQr(table)}>
                <Icon name='qrcode'/>
            </Button>
            <Button color='green' icon onClick={()=>updateTable(table)}>
                <Icon name='pencil'/>
            </Button>
            <Button icon negative onClick={()=>deleteTable(table)}>
                <Icon name='trash'/>
            </Button>
        </Table.Cell>
        
    )
}