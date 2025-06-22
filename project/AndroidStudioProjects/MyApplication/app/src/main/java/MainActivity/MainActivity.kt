package MainActivity

class MainActivity {package com.example.taxirural

    import android.os.Bundle
    import androidx.appcompat.app.AppCompatActivity
    import androidx.fragment.app.Fragment
    import com.example.taxirural.databinding.ActivityMainBinding
    import com.example.taxirural.reservation.ReservationFragment
    import com.example.taxirural.disponibilite.DisponibiliteFragment
    import com.example.taxirural.profil.ProfilFragment

    class MainActivity : AppCompatActivity() {
        private lateinit var binding: ActivityMainBinding

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            binding = ActivityMainBinding.inflate(layoutInflater)
            setContentView(binding.root)

            loadFragment(ReservationFragment()) // Default fragment

            binding.bottomNavigation.setOnItemSelectedListener { item ->
                when (item.itemId) {
                    R.id.menu_reservation -> loadFragment(ReservationFragment())
                    R.id.menu_disponibilite -> loadFragment(DisponibiliteFragment())
                    R.id.menu_profil -> loadFragment(ProfilFragment())
                }
                true
            }
        }

        private fun loadFragment(fragment: Fragment) {
            supportFragmentManager.beginTransaction().replace(R.id.fragment_container, fragment).commit()
        }
    }

}