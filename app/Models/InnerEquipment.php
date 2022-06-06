<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InnerEquipment extends Model

{
    protected $fillable = [
        'id_outer', 'quant', 'tehn_obsl_start', 'fault_date', 'state_delivery_date', 'state_approved_request', 'tehn_obsl_hours',
        'year_issue', 'year_exploitation', 'fault_reason', 'voltage', 'faсtory_number', 'faсtory_name',
        'purpose', 'inner_name', 'inventory_number', 'state_zip', 'state_tech_condition', 'state_priority',
        'state_request'];
    public function outerEquip()
    {
        return $this->belongsTo(OuterEquipment::class, 'id', 'id_outer');
    }
}
