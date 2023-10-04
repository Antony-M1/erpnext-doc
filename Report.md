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

<div>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>
<body>

<h2>HTML Table</h2>

<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>
</div>
