
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";

/**
 * Exports the current visible DOM element as an image
 * @param elementId The ID of the DOM element to export as image
 * @param fileName The file name to save the screenshot as
 */
export const exportAsImage = async (elementId: string = "content-to-export", fileName: string = "chart-export") => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID "${elementId}" not found`);
      return false;
    }

    const canvas = await html2canvas(element, { 
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      allowTaint: true,
      useCORS: true,
    });
    
    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = image;
    link.click();
    return true;
  } catch (error) {
    console.error("Error exporting as image:", error);
    return false;
  }
};

/**
 * Exports data as CSV
 * @param data The data to export
 * @param fileName The file name to save the CSV as
 */
export const exportAsCSV = (data: any[], fileName: string = "data-export") => {
  try {
    if (!data || data.length === 0) {
      console.error("No data to export");
      return false;
    }

    // Get headers from the first object's keys
    const headers = Object.keys(data[0]);
    
    // Convert data to CSV format
    const csvContent = [
      headers.join(","), // Header row
      ...data.map(row => {
        return headers.map(header => {
          const cell = row[header];
          // Handle special characters and commas by wrapping in quotes
          if (cell === null || cell === undefined) {
            return '';
          }
          const cellStr = String(cell);
          return cellStr.includes(",") ? `"${cellStr}"` : cellStr;
        }).join(",");
      })
    ].join("\n");
    
    // Create a download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error("Error exporting as CSV:", error);
    return false;
  }
};

/**
 * Exports data as PDF using html2canvas and jsPDF
 * @param elementId The ID of the DOM element to export as PDF
 * @param fileName The file name to save the PDF as
 */
export const exportAsPDF = async (elementId: string = "content-to-export", fileName: string = "chart-export") => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID "${elementId}" not found`);
      return false;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      allowTaint: true,
      useCORS: true,
    });
    
    // Using dynamic import to avoid import in server-side rendering
    const { jsPDF } = await import('jspdf');
    
    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
      unit: 'mm',
    });
    
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${fileName}.pdf`);
    return true;
  } catch (error) {
    console.error("Error exporting as PDF:", error);
    return false;
  }
};
