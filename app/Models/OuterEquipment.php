<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class OuterEquipment extends Model

{
    protected $fillable = ['equip_name', 'numb_vvod',
        'factory_number', 'factory_name', 'inventory_number', 'purpose', 'year_issue', 'year_exploitation',
        'power', 'current', 'voltage', 'roles', 'id_build', 'state_tech_condition', 'build_id', 'affiliate','role'];

    public function buildings()
    {
        return $this->belongsTo(Buildings::class, 'id', 'build_id');
    }

    public function innerEquip()
    {
        return $this->hasMany(InnerEquipment::class, 'id_outer', 'id');
    }
}


