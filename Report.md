# [Tutorial] Script Reports in ERPNext: A Step-by-Step Guide


## Summary:
Unlock the power of custom reporting in ERPNext with this comprehensive step-by-step guide. Dive into the world of script reports, where you'll learn to harness scripting capabilities to create tailored reports that provide valuable insights for your business. From setting up the environment to writing scripts and designing dynamic reports, this guide covers it all. Elevate your reporting game and gain full control over your ERPNext data.


## Create a report

I'm going to create a simple report with simple `filters` to using the `Employee Checkin` Doctype data.

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
