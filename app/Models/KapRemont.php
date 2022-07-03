<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KapRemont extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'kap_remont';

    protected $fillable = [
        'include_kr_plan', 'done_kr_plan', 'outer_id', 'dv_link', 'vor', 'vor_link', 'done_kr_plan_link',
        'include_kr_plan_link', 'year_cap_remont', 'replacement_name', 'act', 'act_link', 'dv','outer_id'
    ];

    public function outerEquip()
    {
        return $this->belongsTo(OuterEquipment::class, 'id', 'outer_id');
    }
}
