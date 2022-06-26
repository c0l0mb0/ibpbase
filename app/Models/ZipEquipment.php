<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZipEquipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'equip_name',
        'quantity',
        'role'
    ];
}
