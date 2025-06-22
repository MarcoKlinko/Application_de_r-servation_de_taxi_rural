package paiement

class PaymentActivity {
    package com.example.taxiapp.ui.payment

    import android.os.Bundle
    import android.widget.Toast
    import androidx.appcompat.app.AppCompatActivity
    import com.example.taxiapp.databinding.ActivityPaymentBinding

    class PaymentActivity : AppCompatActivity() {
        private lateinit var binding: ActivityPaymentBinding

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            binding = ActivityPaymentBinding.inflate(layoutInflater)
            setContentView(binding.root)

            binding.buttonPay.setOnClickListener {
                Toast.makeText(this, "Paiement effectué avec succès !", Toast.LENGTH_SHORT).show()
                finish()
            }
        }
    }

}