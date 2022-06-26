<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenRen extends Model
{
    use HasFactory;

    protected $fillable = [
        'included_pen_ren', 'delivery_ibp_done', 'outer_id', 'reason_exclude_link', 'comments_pen_ren',
        'year_pen_ren', 'defect_act_number', 'defect_act_number_link', 'delivery_ibp_year', 'reason_exclude',
    ];

    public function outerEquip()
    {
        return $this->belongsTo(OuterEquipment::class, 'id', 'outer_id');
    }
}
