// Copyright (c) 2023, rames and contributors
// For license information, please see license.txt
/* eslint-disable */

var log_type_out_rowIndex = []

frappe.query_reports["Employee Checkin Sheet"] = {
	"filters": [
		{
			"label": "Employee",
        	"fieldname": "employee",
          	"fieldtype": "Link",
			"options":'Employee',
           	"width": 200,
			"reqd": 1
        },
		{
			"label": "Take Action",
        	"fieldname": "custom_take_action",
          	"fieldtype": "Button",
           	"width": 200,
		},
		{
			"label": '<b style="color:blue">Apply CSS</b>',
        	"fieldname": "custom_apply_css",
          	"fieldtype": "Button",
           	"width": 150,
		}
	],
	onload:function(){
		alert('onload')
	},
	formatter:function (value, row, column, data, default_formatter) {

		
		value = default_formatter(value, row, column, data);

		
		if (column.id == 'status'){
			column.editable = true
			column.dropdown = true
		}

		// Edit the column
		try{
			if(column.fieldname == 'edit_me'){
				console.log(row, column)
				column.editable = true
			}
		}catch(err){
			console.log('Total row table error')
			console.log(err)
		}		

		try{
			if(column.fieldname == 'log_type'){
				if(value == 'OUT'){
					log_type_out_rowIndex.push(row[0].rowIndex)
				}
			}
		}catch(err){
			console.log('Total row table error')
			console.log(err)
		}

		
		try{
			if (column.id == 'send_mail'){
			value = `<button class="btn-primary" id="sent-email-${row[0].rowIndex}" data-employee="${data.employee}" data-employee_name="${data.employee}" data-log_type="${data.log_type}" onclick="send_mail(${row[0].rowIndex})">Send Mail</button>`
			return value
			}
		}catch(err){
			console.log('Error throwing because of last column its -> Total Row')
			console.log(err)
		}
		

		

		if (column.id == 'log_type'){
			if (value == 'IN'){
				
			}
		}
		

		if (value == 'IN'){
			value = `<b style="color:green">${value}</b>`
			return value
		}else if (value == 'OUT'){
			value = `<b style="color:red">${value}</b>`
			return value
		}

		return value
	},
	get_chart_data: function (_columns, result) {
		// console.log(_columns, result)
		alert('get_chart_data')
	}
};




$(document).on("click", "button[data-fieldname='custom_take_action']", function() {
    // Your code to be executed when the element is clicked
    alert("Taking Action");

});



$(document).on("click", "button[data-fieldname='custom_apply_css']", function() {

	console.log(log_type_out_rowIndex)

	if(log_type_out_rowIndex.length){
		for(index of log_type_out_rowIndex){
			const element = document.getElementsByClassName(`dt-row-${index}`);
			element[0].style.background = 'antiquewhite';
		}
	}
	const rowCell = document.getElementsByClassName(`dt-cell`);
	for(cell of rowCell){
		cell.style.background = 'inherit'
	}
});




const send_mail = (row_index) => {
	// row_data = JSON.parse(row_data)
	// console.log(row_data)

	button = document.getElementById(`sent-email-${row_index}`)

	var employee = button.getAttribute('data-employee');
    var employee_name = button.getAttribute('data-employee_name');
    var log_type = button.getAttribute('data-log_type');

	console.log(employee, employee_name, log_type)
	 
	console.log(row_index)

	frappe.msgprint({
		title: __('Notification'),
		indicator: 'green',
		message: __(`Mail Sent successfully to <b>${employee_name}</b> Log Type <b>${log_type}</b>`)
	});
}