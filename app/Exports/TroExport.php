<?php

namespace App\Exports;

use App\Models\User;
use App\Models\Users;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Facades\Excel;

class TroExport implements FromCollection, WithEvents, WithHeadings
{
    public function collection()
    {
        $user = Users::find(Auth::user()->getAuthIdentifier())->role;

        return DB::table('outer_equipment')
            ->select(DB::raw('place_first_lev, place_third_lev, equip_name, factory_number, state_tech_condition,
            act_number,act_number_link, act_date, equipment_name,act_content,fault_reason,equipment_state'))
            ->rightJoin('tro', 'outer_equipment.id', '=', 'tro.outer_id')
            ->leftJoin('buildings', 'outer_equipment.id_build', '=', 'buildings.id')
            ->leftJoin('users', 'outer_equipment.role', '=', 'users.role')
            ->where('users.role', $user)
            ->orderBy('outer_equipment.id', 'ASC')
            ->get();
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        $styleArray = [
            'font' => [
                'bold' => true,
            ]
        ];
        return [
            AfterSheet::class => function (AfterSheet $event) use ($styleArray) {
                $event->sheet->getStyle('A1:O1')->applyFromArray($styleArray);
            }

        ];
    }

    public function headings(): array
    {
        return ["Объект", "Место", "Имя", "Номер", "Состояние", "Акт номер", "Акт ссылка", "Дата",
            "Имя оборудования", "Содержание акта", "Причина неиспр.", "Сост.оборудования",];
    }

}
