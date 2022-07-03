<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TehnObslRemont extends Model
{
    use HasFactory;

    protected $table = 'tehn_obsl_remont';

    protected $fillable = [
        'include_toir_plan', 'done_toir_plan', 'outer_id', 'dv', 'dv_link', 'vor', 'vor_link',
        'done_toir_plan_link', 'include_toir_plan_link', 'year_toir', 'module_toir',
        'module_replacement_name', 'act', 'act_link',
    ];

    public function outerEquip()
    {
        return $this->belongsTo(OuterEquipment::class, 'id', 'outer_id');
    }
}
