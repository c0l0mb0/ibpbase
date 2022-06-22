<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InnerEquipment extends Model

{
    protected $fillable = ['id_outer', 'inner_name', 'quant', 'state_tech_condition', 'tehn_obsl_start',
        'fault_date', 'fault_reason', 'faсtory_number', 'faсtory_name', 'purpose', 'inventory_number', 'year_issue',
        'year_exploitation', 'voltage', 'to_4', 'to_5',];

    public function outerEquip()
    {
        return $this->belongsTo(OuterEquipment::class, 'id', 'id_outer');
    }
}
