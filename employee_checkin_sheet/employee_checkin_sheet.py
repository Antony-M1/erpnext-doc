# Copyright (c) 2023, rames and contributors
# For license information, please see license.txt

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
            "align": 'right',
            "column": "test_log_type",
            "resizable": False,

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
		{
			"label": _("Send Mail"),
        	"fieldname": "send_mail",
          	"fieldtype": "Data",
           	"width": 150,
            "align": "center"
		},
		{
			"label": _('<b style="color:blue">Edit Me</b>'),
        	"fieldname": "edit_me",
          	"fieldtype": "Data",
           	"width": 150,
            "align": "center"
		}
  
	]


def get_datas(filters=None):
    
	data = frappe.get_all(
		'Employee Checkin',
		filters={
			'employee': filters.employee
		},
		fields=['employee', 'employee_name', 'log_type', 'time', 'skip_auto_attendance'],
	)
 
	data = [list(temp.values()) for temp in data]


	for temp in data:
		temp.append('') # For Button Send Mail
		temp.append('') # For Editable column 
 
	return data