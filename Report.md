# [Tutorial] Script Reports in ERPNext: A Step-by-Step Guide


## Summary:
Unlock the power of custom reporting in ERPNext with this comprehensive step-by-step guide. Dive into the world of script reports, where you'll learn to harness scripting capabilities to create tailored reports that provide valuable insights for your business. From setting up the environment to writing scripts and designing dynamic reports, this guide covers it all. Elevate your reporting game and gain full control over your ERPNext data.

## Reference Documentation
* [How to change the colours on Report shell](https://discuss.frappe.io/t/how-to-change-the-colours-on-report-shell/89111)
* [How To Color Cell in Any Reports Based on Values Like >10](https://discuss.frappe.io/t/how-to-color-cell-in-any-reports-based-on-values-like-10/34122/9)
* [How to add css file report?](https://discuss.frappe.io/t/how-to-add-css-file-report/110693)

## Create a report

I'm going to create a simple report with simple `filters` using the `Employee Checkin` Doctype data.


![image](https://github.com/Antony-M1/erpnext-doc/assets/96291963/44c02645-a56f-4416-92a7-c0c7cc0c73ea)


**Python**

`employee_checkin_sheet.py`
```
import frappe
from frappe import _


def execute(filters=None):
	columns, data = get_columns(filters=filters), get_datas(filters=filters)
	return columns, data



def get_columns(filters=None):
    return [
  		{
			"label": _("Employee"),
        		"fieldname": "employee",
          		"fieldtype": "Link",
	           	"options": "Employee",
	           	"width": 100
	        },
  		{
			"label": _("Employee Name"),
	        	"fieldname": "employee_name",
	          	"fieldtype": "Data",
	           	"width": 150
	        },
  		{
			"label": _("Log Type"),
	        	"fieldname": "log_type",
	          	"fieldtype": "Data",
	           	"width": 100,
			"align": 'center',
			"dropdown": False
	        },
  		{
			"label": _("Time"),
	        	"fieldname": "time",
	          	"fieldtype": "Datetime",
	           	"width": 200
	        },
  		{
			"label": _("Auto Attenadnce"),
	        	"fieldname": "auto_attendance",
	          	"fieldtype": "Check",
	           	"width": 150
	        },
	]


def get_datas(filters=None):
    
	data = frappe.get_all(
		'Employee Checkin',
		filters={
			'employee': filters.employee
		},
		fields=['employee', 'employee_name', 'log_type', 'time', 'skip_auto_attendance']
	)

	return data
```

**JS File**

`employee_checkin_sheet.js`
```
frappe.query_reports["Employee Checkin Sheet"] = {
	"filters": [
		{
			"label": "Employee",
        		"fieldname": "employee",
          		"fieldtype": "Link",
			"options":'Employee',
           		"width": 200,
			"reqd": 1
        	}
	]
}
```

## What are all the events or functions we can use in JS

* `onload`
  Basically onload you can used to make a server call and fetch data and you can set in filters
  * ```
    onload:function(){
	alert('onload')
     }
    ```
* `formatter`
  Formatter used to change the format and look of the report
  ```
  formatter:function (value, row, column, data, default_formatter) {
	value = default_formatter(value, row, column, data);
  	return value
  }
  ```
* `get_chart_data`
  This function gets triggered when the data is rendered in the report
  ```
  get_chart_data: function (_columns, result) {
	console.log(_columns, result)
  }
  ```

## Column Settings
You can set some settings in the columns like some features.
Here a small example.

check in the `python` file I mentioned above.
```
{
	"label": _("Employee"),
	"fieldname": "employee",
	"fieldtype": "Link",
	"options": "Employee",
	"width": 100
}
```
Here you can see `label`, `fieldname`, `fieldtype`, `options` & `width` but there is other more options is there here some of the options


<table>
  <tr>
    <th>Options</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>align</td>
    <td> It's used to align the content in the cell <span class="highlight">left<span>, <span class="highlight">right<span>, <span class="highlight">center<span></td>
  </tr>
  <tr>
    <td>colIndex</td>
    <td>It's used to change the column position Integer value</td>
  </tr>
  <tr>
    <td>column</td>
    <td>To give a name for a column to handle in diffrent way same like <span style="color:green">fieldname</span></td>
  </tr>
  <tr>
    <td>focusable</td>
    <td>When you click a cell its show which cell you clicked but its in False it won't show</td>
  </tr>
  <tr>
    <td>resizable</td>
    <td>Won't allow you to resize the report</td>
  </tr>
  <tr>
    <td>sortOrder</td>
    <td>String type 'asc', 'desc', 'none'</td>
  </tr>
  
</table>

## Change the color of the cell
we can achieve this through `formatter`

In the report you can see the `IN` & `OUT` log type i want to make the `IN` bold green and `OUT` bold red. the column field name is `log_type`

```
formatter:function (value, row, column, data, default_formatter) {
	value = default_formatter(value, row, column, data);

	if(column.fieldname == 'log_type'){
		if(value == 'IN'){
			value = `<b style="color:green">${value}</b>`
		}else if(value == 'OUT'){
			value = `<b style="color:red">${value}</b>`
		}
	}
}
```
* `value` --> Argument Gives the `current cell` value
* `row` --> This argument gives all the details of the current cell row
* `column` --> This argument gives the `column` details of the current cell
* `data` --> This argument gives the current row `data`
* `default_formatter` it's a formatter funtion
![image](https://github.com/Antony-M1/erpnext-doc/assets/96291963/d1565ec0-95c1-4320-9977-27cc0a2c0ae1)

## Button In Report

### Model 1

Add one button in `filters` in the `js` file like this
```
{
	"label": "Take Action",
	"fieldname": "custom_take_action",
	"fieldtype": "Button",
	"width": 200,
}
```
and add this code at the bottom of the `js` file
```
$(document).on("click", "button[data-fieldname='custom_take_action']", function() {
    // Your code to be executed when the element is clicked
    alert("Taking Action");
});
```

The final output
![image](https://github.com/Antony-M1/erpnext-doc/assets/96291963/856e86e3-ba06-4826-82ac-6f415a6d6ab2)


Basically, you can use this feature for any other operations for example load the `css` file
or `send mail`. some custom operations for these things you can use.

### Model 2

Button in report `cell`. you can perform any operation from that. First create a `column` like this
in python file `employee_checkin_sheet.py`
```
{
	"label": _("Send Mail"),
	"fieldname": "send_mail",
	"fieldtype": "Data",
	"width": 150,
	"align": "center"
}
```

`employee_checkin_sheet.js`

In the `formatter` change add this line
```
try{
	if (column.id == 'send_mail'){
	value = `<button class="btn-primary" id="sent-email-${row[0].rowIndex}" data-employee="${data.employee}" data-employee_name="${data.employee}" data-log_type="${data.log_type}" onclick="send_mail(${row[0].rowIndex})">Send Mail</button>`
	return value
}
}catch(err){
	console.log('Error throwing because of last column its -> Total Row')
	console.log(err)
}
```

After adding the above line in the `formatter` add this `send_mail` function in the  botom of the `JS` filr
```
const send_mail = (row_index) => {


	button = document.getElementById(`sent-email-${row_index}`)

	var employee = button.getAttribute('data-employee');
        var employee_name = button.getAttribute('data-employee_name');
    	var log_type = button.getAttribute('data-log_type');

	frappe.msgprint({
		title: __('Notification'),
		indicator: 'green',
		message: __(`Mail Sent successfully to <b>${employee_name}</b> Log Type <b>${log_type}</b>`)
	});
}
```

The final output like this
![image](https://github.com/Antony-M1/erpnext-doc/assets/96291963/137318d7-0996-414d-ae97-a94d5999b133)


## Change the background color

I want to make the all row background color as a `antiquewhite` for log type is `OUT`

Actually changing the background color of the `row` is not that much easy. Inspect the row you can see the structure of the row in `html` like this
![image](https://github.com/Antony-M1/erpnext-doc/assets/96291963/e6c11ff3-c6dd-4413-880e-53d006f02db1)

You can see the `class="dt-row dt-row-0 vrow"`  in that class `dt-row-0` is unique and we can apply the CSS for each row we have to find the what are all the row contains the log_type `OUT` which means the `rowIndex`.

Row inside a row every `cell` contains class like this `class="dt-cell dt-cell--col-0 dt-cell--0-4 dt-cell--row-4"` here the sample image.
![image](https://github.com/Antony-M1/erpnext-doc/assets/96291963/8fca681c-448d-4551-ace7-88e752ce9f52)

Here you can see lots of class but im chosing the class is this `dt-cell`. note be carefull while using this class it will fetch all the cell.

I'm Creating a button in `js` file in `filters`
```
{
	"label": '<b style="color:blue">Apply CSS</b>',
	"fieldname": "custom_apply_css",
	"fieldtype": "Button",
	"width": 150,
}
```
Finding `rowIndex` `OUT` for the rows. At the top of the `JS` file I'm putting a `global` variable like this
```
var log_type_out_rowIndex = []
```
in the `formatter`, pushing the rowIndex in the `log_type_out_rowIndex` variable
```
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
```


At the bottom of the `JS` file im creating a `event listner`
```
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

```

Final output
![image](https://github.com/Antony-M1/erpnext-doc/assets/96291963/a32b3207-cdfd-4fa6-82a3-18bfacbccae1)

## Editable Column or Cell
Adding one more column in the report
![image](https://github.com/Antony-M1/erpnext-doc/assets/96291963/75d8946a-9007-425a-8830-8eaf86e81865)

