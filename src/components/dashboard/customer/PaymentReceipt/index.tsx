import { formatAmount } from '@/lib/utils';
import { Receipt } from '@/types/services/invoice';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Svg, Circle, Path } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 15,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    amountBox: {
        backgroundColor: '#C1BADB',
        padding: 10,
        borderRadius: 15,
        marginBottom: 20,
    },
    amount: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    amountLabel: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
    detailsSection: {
        borderTop: 1,
        borderColor: '#C1BADB',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: '#C1BADB',
        paddingVertical: 5,
    },
    detailLabel: {
        fontSize: 12,
    },
    detailValue: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

type PaymentReceiptProps = {
    selectedPayment: Receipt;
    user: UserProfileTypes | null;
    formattedDate: string;
};

const PaymentReceipt = ({ selectedPayment, user, formattedDate }: PaymentReceiptProps) => (
    <Document>
        <Page size="LETTER" style={styles.page}>
            <View style={styles.section}>
                <View>
                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <Svg width="70" height="70">
                            <Circle cx="35" cy="35" r="35" fill="#C1F6C3" fillOpacity="0.6" />
                            <Circle cx="34.5" cy="34.5" r="22.5" fill="#A6F8AA" />
                            <Path d="M52 34.9924L48.2291 30.742L48.7545 25.1156L43.1755 23.8619L40.2545 19L35 21.2322L29.7455 19L26.8245 23.8619L21.2455 25.1003L21.7709 30.7267L18 34.9924L21.7709 39.2427L21.2455 44.8844L26.8245 46.1381L29.7455 51L35 48.7525L40.2545 50.9847L43.1755 46.1228L48.7545 44.8691L48.2291 39.2427L52 34.9924ZM31.9091 42.6369L25.7273 36.5213L27.9064 34.3655L31.9091 38.3101L42.0936 28.2346L44.2727 30.4056L31.9091 42.6369Z" fill="#4CAF50" />
                        </Svg>
                    </View>
                </View>
                <Text style={styles.title}>Success</Text>
                <Text style={styles.subtitle}>Your transaction was successful</Text>
                <View style={styles.amountBox}>
                    <Text style={styles.amount}>AUD {formatAmount(selectedPayment.total, "USD", false)}</Text>
                    <Text style={styles.amountLabel}>Amount</Text>
                </View>
                <View style={styles.detailsSection}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Transaction ID:</Text>
                        <Text style={styles.detailValue}>#{selectedPayment.id}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Transaction title:</Text>
                        <Text style={styles.detailValue}>{selectedPayment.bookingTitle}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>From:</Text>
                        <Text style={styles.detailValue}>{user?.firstName} {user?.lastName}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>To:</Text>
                        <Text style={styles.detailValue}>{selectedPayment.serviceProvider.user.fullName}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date:</Text>
                        <Text style={styles.detailValue}>{formattedDate}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default PaymentReceipt;