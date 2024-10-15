import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportersService {

  constructor() { }

  public exportToExcel(data: any[], fileName: string, columns: any[]): void {
    const tableData = data.map(row => {
      let newRow = {};
      columns.forEach(col => {
        if (col.field !== 'edit') {
          newRow[col.header] = row[col.field];
        }
      });
      return newRow;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableData);

    const columnWidths = this.calculateColumnWidths(tableData, columns);

    this.applyHeaderStyles(worksheet, columns);

    worksheet['!cols'] = columnWidths;

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xls', type: 'array' });

    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private calculateColumnWidths(data: any[], columns: any[]): XLSX.ColInfo[] {
    return columns.map(col => {
      const minWidth = 10;
      const maxWidth = 50;

      const width = Math.max(
        ...data.map(row => (row[col.field] ? row[col.field].toString().length : 0)),
        col.header.length
      );

      return { wch: Math.min(maxWidth, Math.max(minWidth, width)) };
    });
  }

  private applyHeaderStyles(worksheet: XLSX.WorkSheet, columns: any[]): void {
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "000000" } },
      alignment: { horizontal: "center" }
    };

    columns.forEach((col, index) => {
      const cellAddress = XLSX.utils.encode_cell({ c: index, r: 0 });
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = { t: 's', v: col.header };
      }

      worksheet[cellAddress].s = headerStyle;
    });

    worksheet['!rows'] = [{ hpx: 20 }];
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public exportToPdf(data: any[], fileName: string, columns: any[]): void {
    const doc = new jsPDF();
    const tableData = data.map(row => {
      let newRow = {};
      columns.forEach(col => {
        if (col.field !== 'edit') {
          newRow[col.header] = row[col.field];
        }
      });
      return newRow;
    });

    const headers = [columns.filter(col => col.field !== 'edit').map(col => col.header)];
    const rows = tableData.map(row => Object.values(row));

    (doc as any).autoTable({
      head: headers,
      body: rows,
      theme: 'grid',
      styles: {
        fontSize: 10,
        halign: 'center'
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255]
      }
    });

    doc.save(`${fileName}.pdf`);
  }

}
