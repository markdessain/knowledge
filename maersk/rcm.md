# RCM

## Terms
* `RCM` - Remote Container Management
* `RCD` - Remote Control Device
* `Controller` - Collects Metrics
* `Alarm` - Raised if metrics are not in a set threshold for a period of time

## Events

::parent_event_history:: /::device_event_history:: /::unit_event_history:: /::ec_container_last_processed_event::

A container has a sensor `unit` which collects all the metrics from the sensors. These then get sent back to the cloud from the  `device`. 

The `parent` table holds metadata about both of these and combines both events together. Although there are some missing events, it should be that:  `count(parent_event) = count(unit_event) + count(device_event)`

The `parent`

* Event Timestamp
* Container Number
* Device Id

The `unit` events will include data such as 

* O2 Reading
* CO2 Reading
* Condenser Fan Output

The `device` event will include data such as

* Firmware Version
* Battery Voltage
* GPS Location

The `Last Processed` event hold a few of the details across both the `unit` and `device`  and allow for quicker access if you do not care about the history.

## Shapshots

::download_event_details:: / ::download_header:: / ::download_sensor_details::

Aggregated data 

## Location

::ec_container_location:: / ::ec_container_location_history::

The current a historical location data. Where the container is currently and where it is going next.

## GCSS

For booking information

::ec_gcss_booking:: / ::ec_gcss_cargo:: / ::ec_gcss_cargo_conditioning:: / ::ec_gcss_cargo_stuffing:: / ::ec_gcss_equipment:: / ::ec_gcss_msp:: / ::ec_gcss_route:: / ::ec_gcss_shipment_party:: 

## Alarms and Workflows
::ec_md_alarm_profile:: / ::ec_ah_alarms:: / ::ec_ah_alarms::

If metrics are outside of business defined boundaries then alarms will be raised. If these alarms are still active for an amount of time then a workforce case will be generated to fix the issue.

## Reference Tables

::event_master:: / ::ec_domains:: / ::ec_defined_area_profile:: / ::ec_container_master::

Contains event types and a constant values table.

## Other Tables

::vw_ec_rdsim_inventory:: /  ::ec_vessel_cell_idmapping::  /  ::ec_pti_report:: /  ::ec_container_booking_link:: /  ::ec_ah_off_power_cycle::
