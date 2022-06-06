<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Buildings extends Model

{
    protected $fillable = ['place_zero_lev', 'place_first_lev', 'place_second_lev', 'place_third_lev'];

    public function outerEquip()
    {
        return $this->hasMany(OuterEquipment::class, 'build_id','id' );
    }
}
