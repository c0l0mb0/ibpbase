<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tro extends Model
{
    use HasFactory;

    protected $table = 'tro';

    protected $fillable = [
        'act_date', 'outer_id', 'act_content', 'fault_reason', 'act_number',
        'act_number_link', 'equipment_state', 'equipment_name',
    ];

    public function outerEquip()
    {
        return $this->belongsTo(OuterEquipment::class, 'id', 'outer_id');
    }
}
