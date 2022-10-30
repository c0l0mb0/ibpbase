<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class OuterEquipment extends Model

{
    protected $fillable = [
        'equip_name', 'factory_number', 'factory_name', 'inventory_number', 'numb_vvod', 'purpose',
        'power', 'current', 'voltage', 'role', 'state_tech_condition', 'id_build',
        'affiliate', 'id_kap_remont', 'id_tehn_obsl_remont', 'id_tro', 'has_zip', 'year_issue_date', 'year_exploitation_date'];

    public function buildings()
    {
        return $this->belongsTo(Buildings::class, 'id', 'build_id');
    }

    public function innerEquip()
    {
        return $this->hasMany(InnerEquipment::class, 'outer_id', 'id');
    }
    public function kapRemont()
    {
        return $this->hasMany(KapRemont::class, 'outer_id', 'id');
    }
    public function tehnObslRemont()
    {
        return $this->hasMany(TehnObslRemont::class, 'outer_id', 'id');
    }
    public function penRen()
    {
        return $this->hasMany(PenRen::class, 'outer_id', 'id');
    }
    public function tro()
    {
        return $this->hasMany(Tro::class, 'outer_id', 'id');
    }
}


